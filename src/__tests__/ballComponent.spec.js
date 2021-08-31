import React from "react";
import Ball from '../components/BallComponent';
import { create } from "react-test-renderer";

describe("Ball component", () => {

  test("Selected ball with id-1 and type-number", () => {
    const component = create(<Ball value={1} isSelected={true} onBallSelected={jest.fn()} type={"number"}/>);
    expect(component.toJSON()).toMatchSnapshot();

    const ball = component.root.findAllByType('button').find((b) => b.props.id.includes('1-number') && b.props.className.includes('ball-selected'));
    expect(ball).toBeDefined();
  });

  test("Selected ball with id-1 and type-star", () => {
    const component = create(<Ball value={1} isSelected={true} onBallSelected={jest.fn()} type={"star"}/>);
    expect(component.toJSON()).toMatchSnapshot();

    const ball = component.root.findAllByType('button').find((b) => b.props.id.includes('1-star') && b.props.className.includes('ball-selected'));
    expect(ball).toBeDefined();
  });

  test("Non selected ball with id-1 and type-number", () => {
    const component = create(<Ball value={1} isSelected={true} onBallSelected={jest.fn()} type={"number"}/>);
    expect(component.toJSON()).toMatchSnapshot();

    const ball = component.root.findAllByType('button').find((b) => b.props.id.includes('1-number') && b.props.className.includes('ball'));
    expect(ball).toBeDefined();
  });

  test("Non selected ball with id-1 and type-star", () => {
    const component = create(<Ball value={1} isSelected={true} onBallSelected={jest.fn()} type={"star"}/>);
    expect(component.toJSON()).toMatchSnapshot();

    const ball = component.root.findAllByType('button').find((b) => b.props.id.includes('1-star') && b.props.className.includes('ball'));
    expect(ball).toBeDefined();
  });

});