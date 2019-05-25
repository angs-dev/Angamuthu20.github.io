import { render } from 'react-dom';
import * as React from 'react';
import { ScheduleComponent, Day, Week, TimelineViews, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
import { applyCategoryColor } from './helper';

import { extend } from '@syncfusion/ej2-base';
import { SampleBase } from './sample-base';
import * as dataSource from './datasource.json';
import moment from 'moment';



export class DayHourLimit extends SampleBase {
    constructor() {
        super(...arguments);
        this.data = extend([], dataSource.employeeEventData, null, true);
    }
    onSubmit() {
        let start = document.getElementById('startTime');
        let end = document.getElementById('endTime');
        this.scheduleObj.startHour = start.value;
        this.scheduleObj.endHour = end.value;
    }
    onEventRendered(args) {
        applyCategoryColor(args, this.scheduleObj.currentView);
    }
    render() {
      let source = [];
     
      this.data.forEach(element => {
        let obj = {};        
        obj.Subject = element.title;
        obj.EndTime = `${moment(element.endTime).format('YYYY-MM-DDThh:mm:ss')}.000Z`;
        obj.StartTime = `${moment(element.startTime).format('YYYY-MM-DDThh:mm:ss')}.000Z`;
        source.push(obj);
      });
      this.data = source;
        return (<div className='schedule-control-section'>
        <div className='col-lg-9 control-section'>
          <div className='control-wrapper'>
            <ScheduleComponent width='100%' height='100%' ref={schedule => this.scheduleObj = schedule} startHour='08:00' endHour='20:00' selectedDate={new Date(2018, 1, 15)} eventSettings={{ dataSource: this.data }} workHours={{ highlight: false }} eventRendered={this.onEventRendered.bind(this)}>
              <Inject services={[Day, Week, TimelineViews, Resize, DragAndDrop]}/>
            </ScheduleComponent>
          </div>
        </div>
      </div>);
    }
}

render(<DayHourLimit />, document.getElementById('sample'));