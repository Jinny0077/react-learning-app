import { useState } from "react";
import {
  Control,
  Resolver,
  SubmitHandler,
  UseFormHandleSubmit,
  useForm,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from "sweetalert2";
import TitleText from "../../utils/Constant";

interface ICreate {
  id?: number;
  asset: string;
  quantity: number | null;
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
}

// validation
const assetSchema = yup.object({
  id: yup.number().label("Id"),
  asset: yup.string().required().label("Asset"),
  quantity: yup
    .number()
    .nullable()
    .required()
    .label("Quantity")
    .positive("Please insert positive number")
    .integer("Please insert integer"),
});

export default function useDataManagementSerivce(): ReturnProps {
  const { control, reset, handleSubmit } = useForm<ICreate>({
    defaultValues: { asset: "", quantity: null },
    resolver: yupResolver(assetSchema) as Resolver<ICreate, any>,
  });

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [toEdit, setToEdit] = useState(false);

  const [error, setError] = useState(false);

  const showModal = async (data: any, edit?: string) => {
    if (edit) {
      setToEdit(true);
    } else {
      reset();
      setToEdit(false);
    }
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    reset();
  };

  const handleOk: SubmitHandler<ICreate> = async () => {
    try {
      if (!toEdit) {
        Swal.fire(
          TitleText.SWEEtALERTTEXT.alerttitle_success,
          "Asset Created Successful.",
          "success"
        );
      } else {
        Swal.fire(
          TitleText.SWEEtALERTTEXT.alerttitle_success,
          "Action Group Updated Successful.",
          "success"
        );
      }
      setIsModalVisible(false);
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

  return {
    isModalVisible,
    toEdit,
    handleCancel,
    showModal,
    control,
    handleSubmit,
    handleOk,
    generateId,
  };
}
