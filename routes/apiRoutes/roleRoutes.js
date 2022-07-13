const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');

// Get all roles and their departments
router.get('/roles', (req, res) => {
    const sql = `SELECT roles.*, departments.name 
                  AS department_name 
                  FROM roles 
                  LEFT JOIN departments 
                  ON roles.department_id = departments.id`;
  
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: rows
      });
    });
  });

// Get single employee with role
router.get('/employee/:id', (req, res) => {
    const sql = `SELECT employees.*, roles.name 
                 AS role_name 
                 FROM employees 
                 LEFT JOIN roles 
                 ON employees.role_id = roles.id 
                 WHERE employees.id = ?`;
    const params = [req.params.id];
  
    db.query(sql, params, (err, row) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: row
      });
    });
  });
  
  // Create a role
  router.post('/role', ({ body }, res) => {
    const errors = inputCheck(
      body,
      'title',
      'salary',
      'department_id'
    );
    if (errors) {
      res.status(400).json({ error: errors });
      return;
    }
  
    const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`;
    const params = [
      body.title,
      body.salary,
      body.department_id
    ];
  
    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: body
      });
    });
  });