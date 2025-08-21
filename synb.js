#!/usr/bin/env node
/*
 * IBM Confidential
 * PID 5737-N85, 5900-AG5
 * Copyright IBM Corp. 2022
 */

process.env.RUN_AS='cli';

require('./dist/sbs-playback.js');
