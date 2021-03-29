const config = require('../config').superAdmin;
const { deleteUser, getAllUsers, getUsersQueries, autorizeSA, setApprove } = require('../controllers/indexSAUser');

module.exports = function (socket) {

    
        /*
      input:
        empty
        output:
            {
                success: true,
            data: [{user_id, login, first_name, last_name}],
            }
    */
    socket.on('getAllUsers', getAllUsers);
    
    
        /*
      input:
        { user_id(optional), date_from(optional) = '1970-01-01', date_to(optional) = 'now()'}
        output:
            {
                success: true,
            data: [{request_id, request_date, request_query, request_query_name, login, first_name, last_name}],
            }
    */
   socket.on('getUsersQueries', getUsersQueries);
   
       /*
      input:
        { user_id }
        output:
            {
                success: true
            }
    */
   socket.on('deleteUser', deleteUser);
   
       /*
      input:
        { user_id }
        output:
            {
                success: true
            }
    */
   socket.on('autorizeSA',  autorizeSA);

       /*
      input:
        { user_id }
        output:
            {
                success: true
            }
    */
            socket.on('setApprove',  setApprove);
}