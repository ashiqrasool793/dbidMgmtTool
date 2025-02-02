import React, { forwardRef } from 'react';
import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import moment from 'moment';
import momentBusinessDays from 'moment-business-days';


const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};


export default function ExampleTable(props) {
    let tableData = props.data
    let tableName = props.tableName
    const [state, setState] = React.useState({
        columns: [
            { title: 'Name', field: 'name' },
            { title: 'Release', field: 'task', lookup: { 1: 'Nov Release', 2: 'Jan Release', 3: 'March Release', 4: 'Not Assigned' } },
            { title: 'Project', field: 'project' },
            { title: 'Start Date', field: 'startDate', type: 'date' },
            { title: 'Man Days', field: 'manDays' },
            { title: 'Completion Date', field: 'completionDate', type: 'date' },
            { title: 'Status', field: 'task', lookup: { 1: 'Not Started', 2: 'In Progress', 3: 'Completed' } }
        ],
        data: tableData,
        tableName: tableName,
        
    });

        return (
            <MaterialTable
                icons={tableIcons}
                style={{ margin: '20px' }}
                title={tableName}
                options={{
                    headerStyle: {
                      backgroundColor: '#2bb6aa',
                      color: 'white',
                      fontWeight: 600,
                      fontSize: '15px'
                    }
                  }}
                columns={state.columns}
                data={state.data}
                editable={{
                    onRowAdd: newData =>
                        new Promise(resolve => {
                            props.onAddRow(tableName, {...newData, completionDate: (moment(newData.completionDate).format('DD-MM-YYYY')).toString(), startDate: (moment(newData.startDate).format('DD-MM-YYYY')).toString()})
                            setTimeout(() => {
                                resolve();
                                const data = [...state.data];
                                data.push({...newData, completionDate: (moment(newData.completionDate).format('DD-MM-YYYY')), startDate: (moment(newData.startDate).format('DD-MM-YYYY'))});
                                setState({ ...state, data });
                            }, 600);
                        }),
                    onRowUpdate: (newData, oldData) => 
                        new Promise(resolve => {
                            props.updateMember(tableName, {...newData, completionDate: (moment(newData.completionDate).format('DD-MM-YYYY')).toString(), startDate: (moment(newData.startDate).format('DD-MM-YYYY')).toString()})
                            setTimeout(() => {
                                resolve();
                                const data = [...state.data];
                                data.splice(data.indexOf(oldData), 1);
                                data.push({...newData, completionDate: (moment(newData.completionDate).format('DD-MM-YYYY')), startDate: (moment(newData.startDate).format('DD-MM-YYYY'))});
                                setState({ ...state, data });
                            }, 600);
                        }),
                    onRowDelete: oldData =>
                        new Promise(resolve => {
                            props.deleteMember(tableName, oldData)
                            setTimeout(() => {
                                resolve();
                                const data = [...state.data];
                                data.splice(data.indexOf(oldData), 1);
                                setState({ ...state, data });
                            }, 600);
                        }),
                }}
            />
        );
}