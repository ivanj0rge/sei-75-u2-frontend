<template>
      <div class="modal" id="attendanceModal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Mark Attendance</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" @click="markAttendance()">Save Attendance</button>
            </div>
          </div>
        </div>
      </div>
  </template>
  
  <script>
  export default {
    name: 'AttendanceModal'
  }
  </script>