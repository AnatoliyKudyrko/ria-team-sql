import * as React from 'react';

import {
    DataGrid, GridToolbar,
    GridToolbarContainer,
    GridToolbarExport,
} from '@material-ui/data-grid';

 const TableView = ({column,rows}) => {
    return (
        <div style={{height: 400, width: '100%',marginTop:'10px'}}>
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