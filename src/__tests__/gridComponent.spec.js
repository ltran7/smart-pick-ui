import React from "react";
import Grid from '../components/GridComponent';
import { create } from "react-test-renderer";

describe("Grid component", () => {

  test("Grid of numbers is rendered with correct number of rows and columns", () => {
    const component = create(<Grid numberOfRows={10} numberOfColumns={5} limit={50} selectionLimit={5} selection={[]} onSelection={jest.fn()} type="number"/>);
    expect(component.toJSON()).toMatchSnapshot();

    const grid = component.root.findAllByType('table');
    const row = component.root.findAllByType('tr');
    const limit = component.root.findAllByType('td');
    expect(grid).toHaveLength(1);
    expect(row).toHaveLength(10);
    expect(limit).toHaveLength(50);
    expect(limit.length/row.length).toBeLessThanOrEqual(5); // Check number of columns
  });

  test("Grid of stars is rendered with correct number of rows and columns", () => {
    const component = create(<Grid numberOfRows={3} numberOfColumns={5} limit={12} selectionLimit={5} selection={[]} onSelection={jest.fn()} type="star"/>);
    expect(component.toJSON()).toMatchSnapshot();

    const grid = component.root.findAllByType('table');
    const row = component.root.findAllByType('tr');
    const limit = component.root.findAllByType('td');
    expect(grid).toHaveLength(1);
    expect(row).toHaveLength(3);
    expect(limit).toHaveLength(12);
    expect(limit.length/row.length).toBeLessThanOrEqual(5); // Check number of columns
  });

  test("Grid of numbers has selected numbers", () => {
    var selectedNumbers = [1, 2, 3];
    const component = create(<Grid numberOfRows={10} numberOfColumns={5} limit={50} selectionLimit={5} selection={selectedNumbers} onSelection={jest.fn()} type="number"/>);
    expect(component.toJSON()).toMatchSnapshot();

    const selection = component.root.findAllByType('button').find((b) => b.props.className.includes('ball-selected'));
    expect(selection).toBeDefined();
  });

  test("Grid of stars has selected stars", () => {
    var selectedStars = [1, 2];
    const component = create(<Grid numberOfRows={10} numberOfColumns={5} limit={50} selectionLimit={5} selection={selectedStars} onSelection={jest.fn()} type="stars"/>);
    expect(component.toJSON()).toMatchSnapshot();

    const selection = component.root.findAllByType('button').find((b) => b.props.className.includes('ball-selected'));
    expect(selection).toBeDefined();
  });

});