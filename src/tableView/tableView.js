import * as React from 'react';
import MUIDataTable from "mui-datatables";
import {
    DataGrid, GridToolbar,
    GridToolbarContainer,
    GridToolbarExport,
} from '@material-ui/data-grid';


const options = {
};

 const TableView = ({column,rows}) => {
     function CustomToolbar() {
         return (
             <GridToolbarContainer >
                 <GridToolbarExport />
             </GridToolbarContainer>
         );
     }
    return (
        <div style={{height: 400, width: '100%',marginTop:'10px'}}>
            {/*    <MUIDataTable
                    data={rows}
                    columns={column}
                    options={options}
                />
                loading={true}
*/}
            <DataGrid rows={rows} columns={column}  localeText={{
                toolbarDensity: 'Size',
                toolbarDensityLabel: 'Size',
                toolbarDensityCompact: 'Small',
                toolbarDensityStandard: 'Medium',
                toolbarDensityComfortable: 'Large',
            }}
                      components={{
                          Toolbar: GridToolbar,
                      }}
            />
        </div>
    );
}

export default TableView;