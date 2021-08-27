/**
 * Author: Prof Richard Krasso
 * Modified by: Eunice Lim
 * Date: 235 Aug 2021
 * Title: employee-api.js
 * APIs for get, post, delete features
*/

const express = require ('express');
const Employee = require('../models/employee');

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
          res.status(501).send({
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
   * Catch clause to catch any errors on server
   */
  catch(e)
  {
    console.log(e);
    res.status(500).send({
      'message': 'Internal server error: ' + e.message
     })
  }
})

/**
 * findAllTasks API
 */
router.get('/:empId/tasks', async(req, res)=>{
  try
  {
    Employee.findOne({'empId': req.params.empId}, 'empId todo done', function(err, employee){
      if (err)
      {
        console.log(err);
        res.status(501).send({
          'message': 'MongoDB exception: ' + err.message
        })
      }
      else{
        console.log(employee);
        res.json(employee);
      }
    })
  }
  catch(e)
  {
    console.log(e);
    res.status(500).send({
      'message': 'Internal server error: ' + e.message
    })
  }
})

/**
 * createTask API
 */

router.post('/:empId/tasks', async(req, res)=>{
  try
  {
    Employee.findOne({'empId': req.params.empId}, function(err, employee){ //pulling employee record
      if (err)
      {
        console.log(err);
        res.status(501).send({
          'message': 'MongoDB Exception: ' + err.message
        })
      }
      else
      {
        console.log(employee);

        const newTask ={  //new task added to found employee record
          text: req.body.text
        };

        employee.todo.push(newTask); //add todo field
        employee.save(function(err, updatedEmployee){  //saving record
          if (err)
          {
            console.log(err);
            res.status(501).send({
              'message': 'MongoDB Exception: ' + err.message
            })
          }
          else
          {
            console.log(updatedEmployee);
            res.json(updatedEmployee);    //updated record to angular
          }
        })
      }
    })
  }
  catch(e)
  {
    console.log(e);
    res.status(500).send({
      'message': 'Internal server error: ' + e.message
    })
  }
})
module.exports = router; //need to export file for SOAP UI to find it
