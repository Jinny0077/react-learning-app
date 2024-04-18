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
import { DataGrid } from "@mui/x-data-grid";

import useDataManagementSerivce from "./service";
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
    generateId,
  } = useDataManagementSerivce();

  const columns = React.useMemo(
    () => [
      {
        field: "id",
        headerName: "Id",
        flex: 1,
        minWidth: 100,
        headerClaseName: "super-app-theme--header",
      },
      {
        field: "asset",
        headerName: "Asset",
        flex: 1,
        minWidth: 100,
        headerClaseName: "super-app-theme--header",
      },
      {
        field: "quantity",
        headerName: "Quantity",
        flex: 1,
        minWidth: 100,
        headerClaseName: "super-app-theme--header",
      },
      {
        field: "action",
        headerName: "Action",
        type: "actions",
        flex: 1,
        minWidth: 130,
        headerClaseName: "super-app-theme--header",
        getAction: () => [
          <>
            <Button>Edit</Button>
            <Button>Delete</Button>
          </>,
        ],
      },
    ],
    []
  );

  return (
    <div>
      <h2>Data Management Dashboard</h2>
      <div>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          paddingBottom="10px"
        >
          <Button
            variant="contained"
            style={{ borderRadius: "20px" }}
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
              backgroundColor: "rgb(106, 90, 205)",
              color: "white",
            },
          }}
        >
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              // rows={}
              columns={columns}
              disableSelectionOnClick
              // onPageSizeChange={(newPageSize: any) => setLength(newPageSize)}
              // pageSize={length}
              // rowsPerPageOptions={[10, 25, 50, 100]}
              // paginationMode="server"
              // rowCount={totalItem}
              // onPageChange={(newPage) => setPage(newPage + 1)}
              autoHeight={true}
              // sortingMode="server"
              // onSortModelChange={handleSort}
              // getRowId={(row) => row.actionGroupId}
              // loading={loading ? true : false}
            />
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
                        render={() => (
                          <Input value={generateId} fullWidth disabled />
                        )}
                      />
                    </Box>
                    <Spacer height={12} />
                    <Box>
                      <InputLabel htmlFor="name">Asset:</InputLabel>
                      <Controller
                        name="asset"
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            fullWidth
                            name="asset"
                            type="text"

                            // error
                          />
                        )}
                      />
                    </Box>
                    <Spacer height={12} />
                    <Box>
                      <InputLabel htmlFor="quantity">Quantity:</InputLabel>
                      <Controller
                        name="quantity"
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            fullWidth
                            name="quantity"
                            type="text"

                            // error
                          />
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
