const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const Role = require("../../models/Role");
