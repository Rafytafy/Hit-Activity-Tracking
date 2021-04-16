import CreateRoutine from '../components/routineComponents/CreateRoutine';
import RoutineDetails from '../components/routineComponents/RoutineDetails';
import Routines from '../components/routineComponents/Routines';

test("Routines exists", () => {
    expect(Routines).toBeDefined();
});
test("Routine Details", () => {
    expect(RoutineDetails).toBeDefined();
});
test("Create Routine exists", () => {
    expect(CreateRoutine).toBeDefined();
});