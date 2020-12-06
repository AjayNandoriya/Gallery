function get_csv_fnames(){
    var csv_fnames = [["csvs/data1.csv"],["csvs/data2.csv"]]; 
    return csv_fnames;
}

function main(){
    var data_id = '#datas'; 
    load_datas(data_id);
    var table = $(data_id).DataTable();

    $(data_id +' tbody').on('click', 'tr', function () {
        var data = table.row( this ).data();
        var csv_fname = data[0];
        load_csv(csv_fname, '#csv_info');
        // alert( 'You clicked on '+data[0]+'\'s row' );
    } );
}

function load_datas(data_id){
    var csv_fnames = get_csv_fnames();
    $(data_id).DataTable( {
        data: csv_fnames,
        columns: [
            { title: "Name" }
        ],
        stateSave:true,
        "bDestroy": true
    } );
    // $('#csv_info').DataTable({
    //     data: [["1"]],
    //     columns: [{title:"0"}],
    //     // stateSave:true,
    //     "bDestroy": true

    // });
}

function load_csv(csv_fname, table_id){
    Papa.parse(csv_fname,{
        download: true,
        complete: function(results) {
            var columns = []
            for(i in results.data[0]){
                column = {title:results.data[0][i]};
                columns.push(column);
            }
            var data = results.data.slice(1,results.data.length);
            console.log('headers');
            console.log(columns);
            console.log('data');
            console.log(data);
            console.log(table_id);
            $(table_id).DataTable( {
                data: data,
                columns: columns,
                // stateSave:true,
                "bDestroy": true
            } );
        }
    });
}
