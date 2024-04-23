import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
  InputLabel,
} from "@mui/material";
import Spacer from "../../components/Spacer";
import React from "react";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";

import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import useDataManagementService from "./service";
import { Controller } from "react-hook-form";

function DataManagement() {
  const {
    isModalVisible,
    toEdit,
    handleCancel,
    showModal,
    control,
    handleSubmit,
    handleOk,
    deleteAsset,
    assetListError,
    assetListing,
  } = useDataManagementService();

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "id",
        headerName: "Id",
        flex: 1,
        minWidth: 100,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "asset",
        headerName: "Asset",
        flex: 1,
        minWidth: 100,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "price",
        headerName: "Price",
        flex: 1,
        minWidth: 100,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "quantity",
        headerName: "Quantity",
        flex: 1,
        minWidth: 100,
        headerClassName: "super-app-theme--header",
      },
      {
        field: "action",
        headerName: "Action",
        type: "actions",
        flex: 1,
        minWidth: 130,
        headerClassName: "super-app-theme--header",
        getActions: (params) => [
          <GridActionsCellItem
            icon={<EditTwoToneIcon />}
            label="Edit"
            onClick={() => showModal(params.row, "edit")}
          />,
          <GridActionsCellItem
            icon={<DeleteTwoToneIcon />}
            label="Delete"
            onClick={() => deleteAsset(params.id)}
          />,
        ],
      },
    ],
    []
  );

  return (
    <div className="data">
      <h2>Data Management Dashboard</h2>
      <div>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          paddingBottom="10px"
        >
          <Button
            variant="contained"
            style={{ borderRadius: "20px", backgroundColor: "#a172a1" }}
            onClick={showModal}
          >
            Create
          </Button>
        </Box>
        <Spacer height={10} />
        <Box
          sx={{
            height: 300,
            width: "100%",
            "& .super-app-theme--header": {
              backgroundColor: "#a172a1",
              color: "white",
            },
          }}
        >
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={assetListing}
              columns={columns}
              // disableSelectionOnClick
              // onPageSizeChange={(newPageSize: any) => setLength(newPageSize)}
              // pageSize={length}
              // pageSize={5}
              // rowsPerPageOptions={[10, 25, 50, 100]}
              // paginationMode="server"
              // rowCount={totalItem}
              // onPageChange={(newPage) => setPage(newPage + 1)}
              autoHeight={true}
              // sortingMode="server"
              // onSortModelChange={handleSort}
              getRowId={(row) => row.id}
              // loading={loading ? true : false}
            />

            {/* Create/Edit Dialog */}
            <Dialog
              open={isModalVisible}
              onClose={handleCancel}
              fullWidth
              maxWidth={"sm"}
            >
              <Box sx={{ padding: "10px" }}>
                <form onSubmit={handleSubmit(handleOk)}>
                  <DialogTitle>
                    {toEdit ? "Update Asset" : "Create New Asset"}
                  </DialogTitle>
                  <Spacer />
                  <DialogContent>
                    <Box>
                      <InputLabel htmlFor="id">Id:</InputLabel>
                      <Controller
                        name="id"
                        control={control}
                        render={({ field }) => (
                          <Input {...field} fullWidth disabled />
                        )}
                      />
                    </Box>
                    <Spacer height={12} />
                    <Box>
                      <InputLabel htmlFor="Asset">Asset:</InputLabel>
                      <Controller
                        name="asset"
                        control={control}
                        render={({ field }) => (
                          <>
                            <Input
                              {...field}
                              fullWidth
                              // name="asset"
                              // type="text"
                              error={assetListError.asset ? true : false}
                            />
                            {assetListError.asset && (
                              <span style={{ color: "red" }}>
                                {assetListError.asset.message}
                              </span>
                            )}
                          </>
                        )}
                      />
                    </Box>
                    <Spacer height={12} />
                    <Box>
                      <InputLabel htmlFor="price">Price:</InputLabel>
                      <Controller
                        name="price"
                        control={control}
                        render={({ field }) => (
                          <>
                            <Input
                              {...field}
                              fullWidth
                              // name="price"
                              // type="text"
                              error={assetListError.price ? true : false}
                            />
                            {assetListError.price && (
                              <span style={{ color: "red" }}>
                                {assetListError.price.message}
                              </span>
                            )}
                          </>
                        )}
                      />
                    </Box>
                    <Spacer height={12} />
                    <Box>
                      <InputLabel htmlFor="quantity">Quantity:</InputLabel>
                      <Spacer height={12} />
                      <Controller
                        name="quantity"
                        control={control}
                        render={({ field }) => (
                          <div
                            style={{
                              display: "flex",
                            }}
                          >
                            <Button
                              variant="outlined"
                              style={{
                                color: "black",
                                borderColor: "gray",
                                marginRight: "15px",
                                minWidth: "30px",
                              }}
                              onClick={() => field.onChange(field.value - 1)}
                            >
                              -
                            </Button>
                            <Input
                              {...field}
                              // value={field.value}
                              style={{
                                width: "100px",
                              }}
                              error={assetListError.quantity ? true : false}
                            />
                            <Button
                              variant="outlined"
                              style={{
                                color: "black",
                                borderColor: "gray",
                                marginLeft: "15px",
                                minWidth: "30px",
                              }}
                              onClick={() => field.onChange(field.value + 1)}
                            >
                              +
                            </Button>

                            {assetListError.quantity && (
                              <span
                                style={{
                                  color: "red",
                                  marginLeft: "20px",
                                  marginTop: "8px",
                                }}
                              >
                                {assetListError.quantity.message}
                              </span>
                            )}
                          </div>
                        )}
                      />
                    </Box>
                  </DialogContent>
                  <DialogActions>
                    <Button type="submit">Ok</Button>
                    <Button onClick={handleCancel}>Cancel</Button>
                  </DialogActions>
                </form>
              </Box>
            </Dialog>
          </div>
        </Box>
      </div>
    </div>
  );
}

export default DataManagement;
