import React from 'react';
import ReactDOM from 'react-dom';

import Detail from '../components/workoutComponents/Detail';
import Edit from '../components/workoutComponents/Edit';
import WorkoutModal from '../components/workoutComponents/WorkoutModal';
import Workouts from '../components/workoutComponents/Workouts';

describe("Detail", () => {
    it("Detail exists", () => {
        expect(Detail).toBeDefined();
    });
    it('Detail renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Detail />, div);
      });
});

describe("Edit", () => {
    it("Edit exists", () => {
        expect(Edit).toBeDefined();
    });
    it('Edit renders without crashing', () => {
       const div = document.createElement('div');
       ReactDOM.render(<Edit />, div);
     });
});

describe("Workout Modal", () => {
    it("Workout Modal exists", () => {
        expect(WorkoutModal).toBeDefined();
    });
    it('Workout Modal renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<WorkoutModal />, div);
      });
});

describe("Workouts", () => {
    it("Workouts exists", () => {
        expect(Workouts).toBeDefined();
});
    it('Workouts renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Workouts />, div);
      });
});