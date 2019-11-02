import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import _ from 'lodash';
import React, { FC, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import i18n from '../../i18n/i18n';
import {
  selectNewProjectLocation,
  setNewProjectLocationAction,
} from '../../projects/newProject/newProject.redux';
import { Location, officeLocations } from '../models/ProjectData';
import Flex from './Flex';

const LocationCheckboxInput: FC = () => {
  const dispatch = useDispatch();
  const locations = useSelector(selectNewProjectLocation);

  const handleChangeCheckbox = useCallback(
    (isChecked: boolean, location: Location) => {
      const newLocations: Location[] = locations.slice();
      if (isChecked) {
        newLocations.push(location);
      } else {
        _.remove(newLocations, (item: Location) => item === location);
      }
      dispatch(setNewProjectLocationAction(newLocations));
    },
    [dispatch, locations]
  );

  return (
    <FormControl required>
      <FormLabel component="legend">
        {i18n.t('project.team.location')}
      </FormLabel>
      <FormGroup>
        <Flex direction="row" flexWrap="wrap">
          {officeLocations.map((location, index) => {
            return (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    color="primary"
                    value={location}
                    onChange={e =>
                      handleChangeCheckbox(e.target.checked, location)
                    }
                    checked={locations.includes(location)}
                  />
                }
                label={location}
              />
            );
          })}
        </Flex>
      </FormGroup>
      <FormHelperText>You can display an error</FormHelperText>
    </FormControl>
  );
};

export default LocationCheckboxInput;
