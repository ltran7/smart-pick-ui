import React from "react";
import SmartPick from '../components/SmartPickComponent';
import { create } from "react-test-renderer";
import { act } from 'react-dom/test-utils';

describe("SmartPick component", () => {

  test("Numbers in grid are selected after being clicked", () => {
    const component = create(<SmartPick />);
    expect(component.toJSON()).toMatchSnapshot();

    // Numbers are not selected
    expect(component.root.findAllByType('button').find((b) => b.props.id.includes('1-number') && b.props.className.includes('ball-selected'))).not.toBeDefined();
    expect(component.root.findAllByType('button').find((b) => b.props.id.includes('2-number') && b.props.className.includes('ball-selected'))).not.toBeDefined();

    act(() => {
        component.root.findAllByType('button').find((b) => b.props.id.includes('1-number') && b.props.className.includes('ball')).props.onClick();
        component.root.findAllByType('button').find((b) => b.props.id.includes('2-number') && b.props.className.includes('ball')).props.onClick();
    });

    // Numbers are selected after being clicked...
    expect(component.root.findAllByType('button').find((b) => b.props.id.includes('1-number') && b.props.className.includes('ball-selected'))).toBeDefined();
    expect(component.root.findAllByType('button').find((b) => b.props.id.includes('2-number') && b.props.className.includes('ball-selected'))).toBeDefined();
    // ...and are present in the selection list
    expect(component.root.findAllByType('span').find((s) => s.props.className.includes('selection numbers')).children[0]).toBeDefined();
    expect(component.root.findAllByType('span').find((s) => s.props.className.includes('selection numbers')).children[1]).toMatch(" - ");
    expect(component.root.findAllByType('span').find((s) => s.props.className.includes('selection numbers')).children[2]).toBeDefined();
    expect(component.root.findAllByType('span').find((s) => s.props.className.includes('selection numbers')).children[3]).not.toBeDefined();
  });

  test("Stars in grid are selected after being clicked", () => {
    const component = create(<SmartPick />);
    expect(component.toJSON()).toMatchSnapshot();

    // Stars are not selected
    expect(component.root.findAllByType('button').find((b) => b.props.id.includes('1-star') && b.props.className.includes('ball-selected'))).not.toBeDefined();
    expect(component.root.findAllByType('button').find((b) => b.props.id.includes('2-star') && b.props.className.includes('ball-selected'))).not.toBeDefined();

    act(() => {
        component.root.findAllByType('button').find((b) => b.props.id.includes('1-star') && b.props.className.includes('ball')).props.onClick();
        component.root.findAllByType('button').find((b) => b.props.id.includes('2-star') && b.props.className.includes('ball')).props.onClick();
    });

    // Stars are selected after being clicked...
    expect(component.root.findAllByType('button').find((b) => b.props.id.includes('1-star') && b.props.className.includes('ball-selected'))).toBeDefined();
    expect(component.root.findAllByType('button').find((b) => b.props.id.includes('2-star') && b.props.className.includes('ball-selected'))).toBeDefined();
    // ...and are present in the selection list
    expect(component.root.findAllByType('span').find((s) => s.props.className.includes('selection stars')).children[0]).toBeDefined();
    expect(component.root.findAllByType('span').find((s) => s.props.className.includes('selection stars')).children[1]).toMatch(" - ");
    expect(component.root.findAllByType('span').find((s) => s.props.className.includes('selection stars')).children[2]).toBeDefined();
    expect(component.root.findAllByType('span').find((s) => s.props.className.includes('selection stars')).children[3]).not.toBeDefined();
  });

  test("Reset button empties selection list", () => {
    const component = create(<SmartPick />);
    expect(component.toJSON()).toMatchSnapshot();

    act(() => {
        component.root.findAllByType('button').find((b) => b.props.id.includes('1-number') && b.props.className.includes('ball')).props.onClick();
        component.root.findAllByType('button').find((b) => b.props.id.includes('1-star') && b.props.className.includes('ball')).props.onClick();
    });

    // Numbers and stars are selected after being clicked...
    expect(component.root.findAllByType('button').find((b) => b.props.id.includes('1-number') && b.props.className.includes('ball-selected'))).toBeDefined();
    expect(component.root.findAllByType('button').find((b) => b.props.id.includes('1-star') && b.props.className.includes('ball-selected'))).toBeDefined();

    act(() => {
        component.root.findAllByType('button').find((b) => b.props.id.includes('reset-button')).props.onClick();
    });

    // Numbers and stars are not selected anymore after clicking on the reset button...
    expect(component.root.findAllByType('button').find((b) => b.props.id.includes('1-number') && b.props.className.includes('ball-selected'))).not.toBeDefined();
    expect(component.root.findAllByType('button').find((b) => b.props.id.includes('1-star') && b.props.className.includes('ball-selected'))).not.toBeDefined();
  });

});