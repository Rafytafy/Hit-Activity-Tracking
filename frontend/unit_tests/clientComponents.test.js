import React from 'react';
import ReactDOM from 'react-dom';

import ClientDetails from '../components/clientComponents/ClientDetails';
import ClientNewProgram from '../components/clientComponents/ClientNewProgram';
import Clients from '../components/clientComponents/Clients';
import RoutineModal from '../components/clientComponents/RoutineModal';
import WorkoutSessions from '../components/clientComponents/WorkoutSessions';

describe("Client Details", () => {    
    it("ClientDetails exists", () => {
        expect(ClientDetails).toBeDefined();
    });
    it('Chart renders without crashing', () => {
        const Chart = document.createElement('Chart');
        ReactDOM.render(<ClientDetails />, Chart);
      });
});

describe("Client New Program", () => {
    it("Client New Program exists", () => {
        expect(ClientNewProgram).toBeDefined();
    });
    it('New Program renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<ClientNewProgram />, div);
    });
});

describe("Clients", () => {  
    it("Clients exists", () => {
        expect(Clients).toBeDefined();
    });
    it('Clients renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Clients />, div);
      });
});

describe("Routine Modal", () => {  
    it("Routine Modal exists", () => {
        expect(RoutineModal).toBeDefined();
    });
    it('Routine Modal renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<RoutineModal />, div);
      });
});

describe("Workout Sessions", () => {
    it("Workout Sessions exists", () => {
        expect(WorkoutSessions).toBeDefined();
    });
    it('Workout Sessions renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<WorkoutSessions />, div);
      });
});