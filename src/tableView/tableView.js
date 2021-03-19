import * as React from 'react';
import MUIDataTable from "mui-datatables";
import {useEffect} from "react";
import {
    DataGrid, GridToolbar,
    GridToolbarContainer,
    GridToolbarExport,
} from '@material-ui/data-grid';
import {makeStyles} from "@material-ui/core/styles";

const options = {
    onRowsDelete:false
};
const useStyles = makeStyles((theme) => ({
        root: {
            marginRight:'100px'
        }}
));
function CustomToolbar() {
 const classes = useStyles();
    return (
        <GridToolbarContainer >
            <GridToolbarExport className={classes.root}/>
        </GridToolbarContainer>
    );
}
 const TableView = ({column,rows}) => {
    return (
        <div style={{height: 400, width: '100%',marginTop:'20px'}}>
            {rows  !== null ?
                <div style={{ height: 400, width: '100%' }}>
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
                : <Loader />}

        </div>
    );
}

const Loader = ()=>{
     return (
         <div>
             loading
         </div>
     )
}
export default TableView;