import React from 'react';
import ReactDOM from 'react-dom';

import CreateRoutine from '../components/routineComponents/CreateRoutine';
import RoutineDetails from '../components/routineComponents/RoutineDetails';
import Routines from '../components/routineComponents/Routines';

describe("Routines", () => {
    it("Routines exists", () => {
        expect(Routines).toBeDefined();
    });
    it('Routines renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Routines />, div);
      });
});

describe("Routine Details", () => {
    it("Routine Details", () => {
        expect(RoutineDetails).toBeDefined();
        });
    it('Routine Details renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<RoutineDetails />, div);
    });
});

describe("Create Routine", () => {
    it("Create Routine exists", () => {
        expect(CreateRoutine).toBeDefined();
    });
    it('Create Routine renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<CreateRoutine />, div);
      });
});