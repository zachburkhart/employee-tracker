const express = require('express');
const inquirer = require('inquirer');
const router = express.Router();
const db = require('../../db/connection');

// Get all departments
router.get('/departments', (req, res) => {
    const sql = `SELECT * FROM departments`;
  
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
  
  // Get single department
  router.get('/department/:id', (req, res) => {
    const sql = `SELECT * FROM departments WHERE id = ?`;
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
  
  module.exports = router;