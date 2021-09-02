/**
 * Author: Prof Richard Krasso
 * Modified by: Eunice Lim
 * Date: 31 Aug 2021
 * Title: employee-api.js
 * APIs for get, post, delete features
*/

const express = require ('express');
const Employee = require('../models/employee');
const BaseResponse = require('../models/base-response')

const router = express.Router();
/**
 * Router to get employee information via employee id numbers.
 */

//localhost:3000/api/employees/1007(empId)
router.get('/:empId', async (req,res) =>{  //empId ties directly to the req.params.empId below

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
        else  //no errors
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
        console.log(err);     //error handling
        res.status(501).send({
          'message': 'MongoDB exception: ' + err.message
        })
      }
      else{         //successful call
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
        console.log(err);   //error handling
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
            console.log(err);   //error handling
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

/**
 * updateTask API
 */

router.put('/:empId/tasks', async(req, res)=>{
  try
  {
    Employee.findOne({'empId': req.params.empId}, function(err,employee){
      if (err)
      {
        console.log(err);   //error handling
        const updateTaskMongoErrorResponse = new BaseResponse('501', 'Mongo server error', err);
        res.status(501).send(updateTaskServerErrorResponse.toObject());
      }
      else
      {
        console.log(employee);

        employee.set({       //successful call
          todo: req.body.todo,
          done: req.body.done
        })

        employee.save(function(err, updatedEmployee){
          if (err)
          {
            console.log(err);    // error handling
            const updateTaskMongoOnSaveErrorResponse = new BaseResponse('501', 'Mongo server error', err);
            res.status(501).send(updateTaskServerErrorResponse.toObject());
          }
          else
          {
            console.log(updatedEmployee);    //successful call
            const updatedTaskSuccessRate  = new BaseResponse('200', 'Update successful', updatedEmployee);
            res.status(200).send(updatedTaskSuccessRate.toObject());
            }
        })
      }
    })
  }
  catch(e)
  {
    console.log(e);
    const updateTaskServerErrorResponse = new BaseResponse('500', 'Internal server error', e); //using base response class
    res.status(500).send(updateTaskServerErrorResponse.toObject());

  }
})

/**
 * deleteTask API
 */
router.delete('/:empId/tasks/:taskId', async(req, res) => {
  try
  {
    Employee.findOne({'empId': req.params.empId}, function(err, employee){
      if (err){
        console.log(err);   //error handling

        const deleteTaskMongoErrorResponse = new BaseResponse('501', 'Mongo server error', err);

        res.status(501).send(deleteTaskMongoErrorResponse.toObject());
      }
      else{
        console.log(employee);      //successful call

        const todoItem = employee.todo.find(item => item._id.toString() === req.params.taskId);
        const doneItem = employee.done.find(item => item._id.toString() === req.params.taskId);

        if (todoItem){
          employee.toto.id(todoItem._id).remove(); //removing record from array
          employee.save(function(err, updatedTodoItemEmployee){
            if (err){
              console.log(err);  //error handling
              const deleteTodoItemMongoErrorResponse = new BaseResponse('501', 'Mongo server error', err);
              res.status(501).send(deleteTodoItemMongoErrorResponse.toObject());
            }
            else{   //successful call
              console.log(updatedTodoItemEmployee);
              const deleteTodoItemSuccessResponse = new BaseResponse('200', 'Item removed from the todo array', updatedTodoItemEmployee);
              res.status(200).send(updatedTodoItemEmployeeResponse.toObject());
            }
          })
        }
        else if (doneItem){
          employee.done.id(doneItem._id).remove();
          employee.save(function(err, updateDoneItemEmployee){
            if (err) //error handling
            {
              console.log(err);
              const deleteDoneItemMongoErrorResponse = new BaseResponse('501', 'Mongo server error', err);
              res.status (501).send(deleteDoneItemMongoErrorResponse.toObject());
            }
             else{
              console.log(updateDoneItemEmployee);  //successful call
              const deleteDoneItemSuccessResponse = new BaseResponse('200', 'Item removed from the done array', updateDoneItemEmployee);
              res.status(200).send(deleteDoneItemSuccessResponse.toObject());
            }
          })
        }
        else{  //successful call
          console.log('Invalid taskId' + req.params.taskId);
          const deleteTasksNotFoundResponse = new BaseResponse('300', 'Unable to locate the requested resources', req.params.taskId);
          res.status(300).send(deleteTasksNotFoundResponse.toObject());
        }
      }

    })

  }
  catch (e)
  {
    console.log(e);
    const deleteTaskServerError= new BaseResponse('500','Internal server error', e);
    res.status(500).send(deleteTaskServerError.toObject());
  }
})

module.exports = router; //need to export file for SOAP UI to find it
