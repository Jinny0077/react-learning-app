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
  assetListError: Partial<FieldErrorsImpl<ICreate>>;
  assetListing: ICreate[];
  deleteAsset: (data?: any) => void;
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
  quantity: yup
    .number()
    .required()
    .label("Quantity")
    .positive("Please insert positive number")
    .integer("Please insert a number"),
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

  const showModal = async (data?: ICreate, edit?: string) => {
    if (edit) {
      setToEdit(true);
      // setAssetListing(data.row);
      reset(data);
    } else {
      reset();
      setToEdit(false);
    }
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    reset({});
  };

  const handleOk: SubmitHandler<ICreate> = async (data) => {
    try {
      console.log("Data to be updated:", data);
      if (!toEdit) {
        const newAsset: ICreate = {
          ...data,
          id: lastGeneratedId + 1,
        };
        await axios.post("http://localhost:3001/assets", newAsset);
        setAssetListing([...assetListing, newAsset]);
        setLastGeneratedId(lastGeneratedId + 1);
        Swal.fire(
          TitleText.SWEEtALERTTEXT.alerttitle_success,
          "Asset Created Successful.",
          "success"
        );
      } else {
        const res = await axios.put(
          `http://localhost:3001/assets/${data.id}`,
          data
        );
        console.log("Update Response:", res.data);
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
      console.error("Update Error:", error.response);
      setError(error);
    }
  };

  // Axios fetch data
  const [assetListing, setAssetListing] = useState<ICreate[]>([]);

  const getAssetListing = async () => {
    try {
      const res = await axios.get("http://localhost:3001/assets");
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

  const deleteAsset = async (id: number) => {
    Swal.fire({
      text: TitleText.SWEEtALERTTEXT.alerttext_warning,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:3001/assets/${id}`);
          Swal.fire(
            TitleText.SWEEtALERTTEXT.alerttitle_success,
            "Access Group has been deleted!",
            "success"
          );
          const updateAssetListing = assetListing.filter(
            (item) => item.id !== id
          );
          setAssetListing(updateAssetListing);
          // getAssetListing();
        } catch (error) {
          console.error("Delete data:", error);
        }
      }
    });
  };

  // const deleteAsset = (id: number) => {
  //   if (window.confirm("Do you want to remove?")) {
  //     axios
  //       .delete(`http://localhost:3001/assets/${id}`)
  //       .then(() => {
  //         alert("Remove successfully.");
  //         const updatedProducts = assetListing.filter(
  //           (product) => product.id !== id
  //         );
  //         setAssetListing(updatedProducts);
  //       })
  //       .catch((err) => {
  //         console.log(err.message);
  //       });
  //   }
  // };

  return {
    isModalVisible,
    toEdit,
    handleCancel,
    showModal,
    control,
    handleSubmit,
    handleOk,
    assetListError,
    assetListing,
    deleteAsset,
  };
}
