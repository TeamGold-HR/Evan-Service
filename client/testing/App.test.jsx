/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'enzyme';
import App from '../src/App';

describe('unit tests', () => {
  const docWrapper = mount(<App />, { attachTo: document.body });
  const testDate = new Date('January 1, 2020 00:00:0000');

  it('should render', () => {
    const app = mount(<App />);
    expect(app).toExist();
  });
  it('should update state when increase is called with a valid occupant type and additional occupants can be added', () => {
    const wrapper = mount(<App />);
    wrapper.setState({
      maxAdults: 2,
      maxChildren: 1,
      maxNonInfants: 3,
      adultsSelected: 0,
    });
    wrapper.instance().increase('increase-adults');
    wrapper.instance().increase('increase-children');
    wrapper.instance().increase('increase-infants');
    wrapper.instance().forceUpdate();
    expect(wrapper.instance().state.adultsSelected).toBe(1);
    expect(wrapper.instance().state.childrenSelected).toBe(1);
    expect(wrapper.instance().state.infantsSelected).toBe(1);
    expect(wrapper.instance().state.rent).toBe(70);
    expect(wrapper.instance().state.serviceFee).toBe(14);
    expect(wrapper.instance().state.occupancyFee).toBe(14);
  });
  it('should not update state if increase is called and there are no open occupant spots', () => {
    const wrapper = mount(<App />);
    wrapper.setState({
      infantsSelected: 5,
    });
    wrapper.instance().increase('increase-children');
    wrapper.instance().increase('increase-children');
    wrapper.instance().increase('increase-infants');
    wrapper.instance().forceUpdate();
    expect(wrapper.instance().state.childrenSelected).toBe(0);
    expect(wrapper.instance().state.adultsSelected).toBe(1);
    expect(wrapper.instance().state.infantsSelected).toBe(5);
    expect(wrapper.instance().state.rent).toBe(0);
    expect(wrapper.instance().state.serviceFee).toBe(0);
    expect(wrapper.instance().state.occupancyFee).toBe(0);
  });
  it('should update state if a decrease button is clicked and more occupants than the minimum are present', () => {
    const wrapper = mount(<App />);
    wrapper.setState({
      adultsSelected: 2,
      childrenSelected: 1,
      infantsSelected: 1,
      maxNonInfants: 5,
      rent: 70,
      serviceFee: 14,
      occupancyFee: 14,
    });
    wrapper.instance().decrease('decrease-adults');
    wrapper.instance().decrease('decrease-children');
    wrapper.instance().decrease('decrease-infants');
    expect(wrapper.instance().state.adultsSelected).toBe(1);
    expect(wrapper.instance().state.childrenSelected).toBe(0);
    expect(wrapper.instance().state.infantsSelected).toBe(0);
    expect(wrapper.instance().state.rent).toBe(0);
    expect(wrapper.instance().state.serviceFee).toBe(0);
    expect(wrapper.instance().state.occupancyFee).toBe(0);
  });
  it('should correctly synthesize dates it is given', () => {
    const wrapper = mount(<App />);
    const dateJan = new Date('January 1, 2020 00:00:0000');
    const dateFeb = new Date('February 2, 2019 00:00:0000');
    const dateMar = new Date('March 3, 2018 00:00:0000');
    const dateApr = new Date('April 4, 2017 00:00:0000');
    const dateMay = new Date('May 5, 2016 00:00:0000');
    const dateJun = new Date('June 6, 2015 00:00:0000');
    const dateJul = new Date('July 7, 2014 00:00:0000');
    const dateAug = new Date('August 8, 2013 00:00:0000');
    const dateSep = new Date('September 9, 2012 00:00:0000');
    const dateOct = new Date('October 10, 2011 00:00:0000');
    const dateNov = new Date('November 11, 2010 00:00:0000');
    const dateDec = new Date('December 12, 2009 00:00:0000');
    expect(wrapper.instance().dateSynthesis(dateJan)).toEqual([0, 1]);
    expect(wrapper.instance().dateSynthesis(dateFeb)).toEqual([1, 2]);
    expect(wrapper.instance().dateSynthesis(dateMar)).toEqual([2, 3]);
    expect(wrapper.instance().dateSynthesis(dateApr)).toEqual([3, 4]);
    expect(wrapper.instance().dateSynthesis(dateMay)).toEqual([4, 5]);
    expect(wrapper.instance().dateSynthesis(dateJun)).toEqual([5, 6]);
    expect(wrapper.instance().dateSynthesis(dateJul)).toEqual([6, 7]);
    expect(wrapper.instance().dateSynthesis(dateAug)).toEqual([7, 8]);
    expect(wrapper.instance().dateSynthesis(dateSep)).toEqual([8, 9]);
    expect(wrapper.instance().dateSynthesis(dateOct)).toEqual([9, 10]);
    expect(wrapper.instance().dateSynthesis(dateNov)).toEqual([10, 11]);
    expect(wrapper.instance().dateSynthesis(dateDec)).toEqual([11, 12]);
  });
  it('should properly reset all values upon invoking finalize', () => {
    docWrapper.setState({
      firstSelection: [1, 1],
      secondSelection: [2, 2],
      adultsSelected: 2,
      childrenSelected: 3,
      infantsSelected: 4,
      rent: 100,
      serviceFee: 20,
      occupancyFee: 30,
    });
    docWrapper.instance().finalize();
    expect(docWrapper.instance().state.firstSelection).toBe('');
  });
  it('should invoke toggleOccupants when the occupant button is clicked', () => {
    docWrapper.setState({
      occModal: false,
    });
    docWrapper.find('#occupant-button').simulate('click');
    expect(docWrapper.instance().state.occModal).toBe(true);
    docWrapper.find('#occupant-button').simulate('click');
    expect(docWrapper.instance().state.occModal).toBe(false);
  });
  it('should invoke toggleNote when the note buttons are clicked', () => {
    docWrapper.setState({
      occNoteModal: false,
      serviceNoteModal: false,
      cleaningNoteModal: false,
      rentNoteModal: false,
    });
    docWrapper.find('#rent-click').simulate('click');
    expect(docWrapper.instance().state.rentNoteModal).toBe(true);
    docWrapper.find('#service-click').simulate('click');
    expect(docWrapper.instance().state.serviceNoteModal).toBe(true);
    docWrapper.find('#occupancy-click').simulate('click');
    expect(docWrapper.instance().state.occNoteModal).toBe(true);
    docWrapper.find('#cleaning-click').simulate('click');
    expect(docWrapper.instance().state.cleaningNoteModal).toBe(true);
  });
  it('should call closeModal when the modal exit buttons are clicked', () => {
    docWrapper.setState({
      occNoteModal: false,
      serviceNoteModal: false,
      cleaningNoteModal: false,
      rentNoteModal: false,
    });
    docWrapper.find('#service-exit').simulate('click');
    expect(docWrapper.instance().state.serviceNoteModal).toBe(false);
    docWrapper.find('#rent-exit').simulate('click');
    expect(docWrapper.instance().state.rentNoteModal).toBe(false);
    docWrapper.find('#occupancy-exit').simulate('click');
    expect(docWrapper.instance().state.occNoteModal).toBe(false);
    docWrapper.find('#cleaning-exit').simulate('click');
    expect(docWrapper.instance().state.cleaningNoteModal).toBe(false);
  });
  it('should correctly update the first selection in state when a valid date is passed into dateChange', () => {
    docWrapper.setState({
      firstPick: true,
    });
    docWrapper.instance().dateChange(testDate);
    expect(docWrapper.instance().state.firstSelection).toEqual([0, 1]);
  });
  it('should correctly update the second selection when a first selection has already been made', () => {
    docWrapper.setState({
      firstPick: false,
      secondPick: true,
    });
    docWrapper.instance().dateChange(testDate);
    expect(docWrapper.instance().state.secondSelection).toEqual([0, 1]);
  });
  it('should catch if a user tries to set a checkout date that is earlier than their checkin date', () => {
    docWrapper.setState({
      firstPick: false,
      secondPick: true,
      firstSelection: [10, 10],
      secondSelection: '',
    });
    docWrapper.instance().dateChange(testDate);
    expect(docWrapper.instance().state.firstPick).toBe(false);
    expect(docWrapper.instance().state.secondPick).toBe(false);
    expect(docWrapper.instance().state.firstSelection).toBe('');
    expect(docWrapper.instance().state.secondSelection).toBe('');
  });
  it('should properly initialize calendar date selection when the calendar button is pressed', () => {
    docWrapper.setState({
      calModal: false,
    });
    docWrapper.instance().toggleCalendar();
    expect(docWrapper.instance().state.firstPick).toBe(true);
    expect(docWrapper.instance().state.secondPick).toBe(false);
    expect(docWrapper.instance().state.firstSelection).toBe('');
    expect(docWrapper.instance().state.secondSelection).toBe('');
    expect(docWrapper.instance().state.calModal).toBe(true);
  });
  it('should clear date selections if the calendar button is clicked while the calendar modal is open', () => {
    docWrapper.setState({
      calModal: true,
      firstSelection: [1, 1],
    });
    docWrapper.instance().toggleCalendar();
    expect(docWrapper.instance().state.calModal).toBe(false);
    expect(docWrapper.instance().state.firstSelection).toBe('');
    expect(docWrapper.instance().state.secondSelection).toBe('');
  });
});
