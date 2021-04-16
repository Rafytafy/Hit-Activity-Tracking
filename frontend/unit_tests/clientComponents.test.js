import ClientDetails from '../components/clientComponents/ClientDetails';
import ClientNewProgram from '../components/clientComponents/ClientNewProgram';
import Clients from '../components/clientComponents/Clients';
import RoutineModal from '../components/clientComponents/RoutineModal';
import WorkoutSessions from '../components/clientComponents/WorkoutSessions';

test("ClientDetails exists", () => {
    expect(ClientDetails).toBeDefined();
});
test("Client New Program exists", () => {
    expect(ClientNewProgram).toBeDefined();
});
test("Clients exists", () => {
    expect(Clients).toBeDefined();
});
test("Routine Modal exists", () => {
    expect(RoutineModal).toBeDefined();
});
test("Workout Sessions exists", () => {
    expect(WorkoutSessions).toBeDefined();
});