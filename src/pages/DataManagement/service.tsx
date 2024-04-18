import { useEffect, useState } from "react";
import {
  Control,
  FieldErrorsImpl,
  Resolver,
  SubmitHandler,
  UseFormHandleSubmit,
  useForm,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from "sweetalert2";
import TitleText from "../../utils/Constant";
import axios from "axios";

interface ICreate {
  id?: number;
  asset: string;
  price: number | null;
  quantity: number;
}

interface ReturnProps {
  isModalVisible: boolean;
  toEdit?: boolean;
  handleCancel: () => void;
  showModal: (data?: any, edit?: string) => void;
  control: Control<ICreate, any>;
  handleSubmit: UseFormHandleSubmit<ICreate>;
  handleOk: SubmitHandler<ICreate>;
  generateId: (id: number) => string;
  assetListError: Partial<FieldErrorsImpl<ICreate>>;
  handleIncrease: () => void;
  handleDecrease: () => void;
  quantity: number;
  assetListing: ICreate[];
}

// validation
const assetSchema = yup.object({
  id: yup.number().label("Id"),
  asset: yup.string().required().label("Asset"),
  price: yup
    .number()
    .required()
    .label("Price")
    .positive("Please insert positive number")
    .integer("Please insert integer"),
  quantity: yup.number().label("Quantity"),
});

export default function useDataManagementService(): ReturnProps {
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors: assetListError },
  } = useForm<ICreate>({
    defaultValues: { asset: "", price: null, quantity: 0 },
    resolver: yupResolver(assetSchema) as Resolver<ICreate, any>,
  });

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [toEdit, setToEdit] = useState(false);

  const [error, setError] = useState(false);

  const [lastGeneratedId, setLastGeneratedId] = useState<number>(0);

  const showModal = async (data: any, edit?: string) => {
    if (edit) {
      setToEdit(true);
      // setAssetListing(data.row);
    } else {
      reset();
      setQuantity(0);
      setToEdit(false);
    }
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    reset();
  };

  const handleOk: SubmitHandler<ICreate> = async (data) => {
    try {
      console.log("Data before Axios request:", data);
      if (!toEdit) {
        const newAsset: ICreate = {
          ...data,
          id: lastGeneratedId + 1,
        };
        await axios.post("../../db.json", newAsset);
        setAssetListing([...assetListing, newAsset]);
        setLastGeneratedId(lastGeneratedId + 1);
        Swal.fire(
          TitleText.SWEEtALERTTEXT.alerttitle_success,
          "Asset Created Successful.",
          "success"
        );
      } else {
        const res = await axios.put(`../../db.json/${data.id}`, data);
        const updateAssetListing = assetListing.map((item) =>
          item.id === res.data.id ? data : item
        );
        setAssetListing(updateAssetListing);
        Swal.fire(
          TitleText.SWEEtALERTTEXT.alerttitle_success,
          "Action Group Updated Successful.",
          "success"
        );
      }
      // getAssetListing();
      reset();
      setIsModalVisible(false);
      console.log(data);
    } catch (error: any) {
      setError(error);
    }
  };

  const generateId = (length: number): string => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  // Quantity Button
  const [quantity, setQuantity] = useState(0);

  const handleIncrease = () => {
    console.log("Increasing quantity");
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  // Axios fetch data
  const [assetListing, setAssetListing] = useState<ICreate[]>([]);

  const getAssetListing = async () => {
    try {
      const res = await axios.get("../../db.json");
      setAssetListing(res.data);
      if (res.data.length > 0) {
        // Find the maximum ID in the existing data and set lastGeneratedId accordingly
        const maxId = Math.max(...res.data.map((item: ICreate) => item.id));
        setLastGeneratedId(maxId);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getAssetListing();
    console.log(assetListing);
  }, []);

  return {
    isModalVisible,
    toEdit,
    handleCancel,
    showModal,
    control,
    handleSubmit,
    handleOk,
    generateId,
    assetListError,
    handleIncrease,
    handleDecrease,
    quantity,
    assetListing,
  };
}
