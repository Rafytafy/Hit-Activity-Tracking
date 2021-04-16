import Detail from '../components/workoutComponents/Detail';
import Edit from '../components/workoutComponents/Edit';
import WorkoutModal from '../components/workoutComponents/WorkoutModal';
import Workouts from '../components/workoutComponents/Workouts';

test("Detail exists", () => {
    expect(Detail).toBeDefined();
});
test("Edit exists", () => {
    expect(Edit).toBeDefined();
});
test("Workout Modal exists", () => {
    expect(WorkoutModal).toBeDefined();
});
test("Workouts exists", () => {
    expect(Workouts).toBeDefined();
});