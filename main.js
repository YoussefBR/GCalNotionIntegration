// CUSTOMIZABLE
// Replace with the calendar ID for the calendar you want
const CALENDAR_ID = 'youssef.boshrariad@gmail.com';
const TASKS_ID = Tasks.Tasklists.list().items[0].id;

// Set the time range for the events you want to retrieve
const timeMin = new Date();
const timeMax = new Date();
timeMax.setDate(timeMax.getDate() + 7); // Get events for the next 7 days

// PROGRAM VAR INITS
// Create variables for users main calendar and tasklist
const calendar = CalendarApp.getCalendarById(CALENDAR_ID);
const tasklist = Tasks.Tasks.list(TASKS_ID);
console.log(tasklist)

// Internal arrays to store events and tasks
const events = [];
const tasks = [];

// main - pulls events and tasks into internal arrays
function main(){
  pullGCal();
  pullTasks();
}

function pullGCal(){
    calendar.getEvents(timeMin, timeMax).forEach((event) => {
      // Check if event is already in the array
      const existingEvent = events.find((e) => e.id == event.getId());
      if (!existingEvent) {
        // Add if not
        events.push(
          // Checks if all day event as all day events have their own get date functions that must be used
          event.isAllDayEvent()?
          { 
            id: event.getId(),
            title: event.getTitle(),
            description: event.getDescription(),
            start: event.getAllDayStartDate(),
            end: event.getAllDayEndDate(),
          }:{
            id: event.getId(),
            title: event.getTitle(),
            description: event.getDescription(),
            start: event.getStartTime(),
            end: event.getEndTime(),
          });
      }
    });
    
    // Display for debugging purposes
    console.log(events);
}
// Implementation for pull tasks is less efficient and pulls all tasks as the API itself is much more limited
function pullTasks(){
  for (let i = 0; i < tasklist.items.length; i++) {
    const task = tasklist.items[i];
    // Check if the task is already in the array
    const existingTask = tasks.find((t) => t.id == task.id);
    if(!existingTask){
      // Add if not
      tasks.push({
        id: task.id,
        title: task.title,
        due: task.due,
        status: task.status,
      });
    }
  }
  
  // Display for debugging purposes
  console.log(tasks);
}
