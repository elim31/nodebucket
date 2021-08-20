/**
 * Author: Prof Richard Krasso
 * Modified by: Eunice Lim
 * Date: 17 Aug 2021
 * Title: employee-api.js
 * Employee API for returning set employee ids.
*/

const express = require ('express');
const { find } = require('../models/employee');
const Employee = require ('../models/employee');

const router = express.Router();
/**
 * Router to get employee information via employee id numbers.
 */

//localhost:3000/api/employees/1007(empId)
router.get('/:empId', async (req,res) =>{

/** Try and catch clause; this is to route errors or show relevant information */

  try
  {
    Employee.findOne({'empId': req.params.empId}, function(err, employee){ //err is database level error
        if(err)
        {
          console.log(err);
          res.status(500).send({
            'message': 'MongoDB server error:' + err.message
          })
        }
        else
        {
          console.log(employee);
          res.json(employee);
        }
    })
  }
  /**
   * Catch clause to catch any errors
   */
  catch(e)
  {
    console.log(e);
    res.status(500).send({
      'message': 'Internal server error: ' + e.message
     })
  }
})

module.exports = router; //need to export file for SOAP UI to find it
