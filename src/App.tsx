
import React, { useState } from 'react';
import { ConfigProvider, Switch, Radio, Checkbox, Button, Input } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox/Checkbox';
// import { TextField } from '@mui/material';
import { RadioChangeEvent } from 'antd';

import { data as initialData } from './data';
import './index.css';



const App: React.FC = () => {
  const options = [
    { label: 'Redux', value: '0' },
    { label: 'Lodash', value: '1' },
    { label: 'Ant design', value: '2' },
    { label: 'Webpack', value: '3' },
    { label: 'Other', value: '4' },
  ];

  const [data, setData] = useState({
    ...initialData,
    isProficient: initialData.isProficient ? 'yes' : 'no', // Convert boolean to string to match Radio value
    toolsUsed: initialData.toolsUsed.split(',').map((num) => num.trim()), // Convert string to array
    isEditable: true,
    firstName: ''
  });

  const handleSwitchChange = (checked: boolean) => {
    setData({ ...data, isEditable: checked });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, firstName: e.target.value });
  };

  const handleRadioChange = (e: RadioChangeEvent) => {
    setData({ ...data, isProficient: e.target.value });
  };

  const handleCheckboxChange = (e: CheckboxChangeEvent) => {
    const value = e.target.value;
    const checked = e.target.checked;
    // Update the toolsUsed array based on whether the checkbox was checked or unchecked
    setData(prevData => {
      const newToolsUsed = checked
        ? [...prevData.toolsUsed, value.toString()] // Add to array if checked
        : prevData.toolsUsed.filter(tool => tool !== value.toString()); // Remove from array if unchecked
      return { ...prevData, toolsUsed: newToolsUsed };
    });
  };

  const processFormData = () => {
    // Before logging, convert the array back to a comma-separated string if needed
    const outputData = {
      ...data,
      isProficient: data.isProficient === 'yes',
      toolsUsed: data.toolsUsed.join(','),
    };
    console.log(outputData);
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Switch: {
            handleBg: data.isEditable ? 'white' : '#6B47ED',
            handleSize: 14,
            trackPadding: 2,
          },
          Radio: {
            buttonBg: 'red',
            radioSize: 12,
            buttonCheckedBgDisabled: 'red',
          },
        },
        token: {
          colorPrimary: '#6B47ED',
          colorPrimaryActive: '#6B47ED',
          colorBgContainerDisabled: '#D8D8D8',
        },
      }}
    >
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="w-[380px] h-[650px] p-8 rounded-[20px] space-y-10 bg-white flex flex-col items-center justify-center" >
          <div className="w-[316px] h-[489px] flex flex-col gap-5 bg-white">
            {/* Editable */}
            <div className="w-[316px] flex items-center bg-white justify-between font-nunito text-[16px] font-medium leading-[22px] text-left text-[#343434] gap-[16px]" style={{ minHeight: '22px' }}>
              <label className="mr-2">Editable</label>
              <Switch
                checked={data.isEditable}
                onChange={handleSwitchChange}
                className={`${data.isEditable ? 'bg-[#6B47ED]' : 'bg-white'} h-[18px] w-[38px] ${data.isEditable ? 'shadow-[0_0_0_2px_#6B47ED]' : 'shadow-[0_0_3px_3px_#d9d9d9]'}`}
                style={{
                  height: '18px',
                  width: '38px',
                }}
              />
            </div>
            {/* First Name */}
            <div className="mb-4" data-editable={data.isEditable} >
              <Input
                className={`w-[316px] h-[46px] p-3 rounded-md bg-white-force ${data.isEditable ? "border border-[#D8D8D8]" : "border border-[#F5F5F5] text-[#F5F5F5]"}`}
                placeholder="First Name"
                onChange={handleInputChange}
                disabled={!data.isEditable}
                value={data.firstName}
                style={{
                  fontFamily: 'Nunito, sans-serif',
                  fontSize: '16px',
                  fontWeight: '400',
                  lineHeight: '22px',
                  letterSpacing: '0px',
                  textAlign: 'left',
                  color: data.isEditable ? '#979797' : '#F5F5F5', // This sets the text color, not the placeholder color
                }}
              />
            </div>

            {/* <TextField id="filled-basic"
              label="First Name"
              variant="filled"
              value={data.firstName}
              disabled={!data.isEditable}
              onChange={handleInputChange}
              className={`w-[316px] h-[46px] rounded-md ${data.isEditable ? "bg-white" : "bg-[#F5F5F5] text-[#F5F5F5]"} `}
              sx={{
                '& .MuiInputBase-root': {
                  border: data.isEditable ? '1px solid #D8D8D8' : '1px solid #F5F5F5', // Conditional border color
                  borderRadius: '8px solid',
                  height: '46px',
                  '&:hover': {
                    borderColor: data.isEditable ? '#6B47ED' : '#F5F5F5', // Border color on hover
                    borderWidth: '1px'
                  },
                  '&.Mui-focused': {
                    borderColor: '#6B47ED', // Border color when focused (active)
                    borderWidth: '1px'
                  },
                },
                '& .MuiFilledInput-input': {
                  backgroundColor: 'white'
                },
                '& .MuiFilledInput-underline:before': {
                  // Remove default bottom border
                  borderBottom: 'none',
                },
                '& .MuiFilledInput-underline:after': {
                  // Remove bottom border on focus
                  borderBottom: 'none',
                },
              }}
            /> */}


            {/* proficient Radio */}
            <div className="flex flex-col w-[316px] bg-white justify-between" style={{ minHeight: '22px', gap: '15px', marginTop: '-15px' }}>
              <div className="font-nunito text-lg font-bold leading-6 align-left text-[#343434]" style={{ letterSpacing: '0em' }}>
                <label className="mb-2">Are you proficient in ReactJS development?</label>
              </div>
              <div className="h-[59px]" style={{ minHeight: '22px' }}>
                <Radio.Group
                  onChange={handleRadioChange}
                  value={data.isProficient}
                  disabled={!data.isEditable}
                  className={`flex flex-col gap-3.75 ${!data.isEditable ? 'nonEditable' : ''}`}
                  size='small'
                >
                  <div style={{ marginBottom: '15px' }}>
                    <Radio value="no">
                      <span style={{ color: data.isProficient === 'no' ? 'black' : '#979797', fontSize: '16px', fontWeight: 400, fontFamily: 'Nunito' }}>No</span>
                    </Radio>
                  </div>
                  <div>
                    <Radio value="yes">
                      <span style={{ color: data.isProficient === 'yes' ? 'black' : '#979797', fontSize: '16px', fontWeight: 400, fontFamily: 'Nunito' }}>Yes</span>
                    </Radio>
                  </div>
                </Radio.Group>
              </div>
            </div>

            {/* checkboxes select */}
            <div className="flex flex-col w-[316px] bg-white justify-between" style={{ minHeight: '22px' }}>
              <div className="font-nunito text-lg font-bold leading-6 align-left text-[#000000]" style={{ letterSpacing: '0em' }}>
                <label className="mb-2">Which tools do you use?</label>
              </div>
              <div className="font-nunito text-[16] font-[400] leading-6 align-left text-[#616161]" style={{ letterSpacing: '0em' }}>
                <label>Please select all that apply.</label>
              </div>
              <div className="h-[170px]" style={{ paddingTop: '15px' }}>
                {/* Render each checkbox individually */}
                <div className="flex flex-col gap-2">
                  {options.map((option) => (
                    <Checkbox
                      key={option.value}
                      value={option.value}
                      onChange={handleCheckboxChange}
                      checked={data.toolsUsed.includes(option.value)}
                      disabled={!data.isEditable}
                      className={`${!data.isEditable ? 'nonEditable' : ''}`}
                    >
                      <span
                        style={{
                          color: data.toolsUsed.includes(option.value)
                            ? 'black' // Color for selected (checked) options
                            : '#979797', // Color for unselected (unchecked) options
                          fontSize: '16px',
                          fontWeight: 400,
                          fontFamily: 'Nunito'
                        }}
                      >
                        {option.label}
                      </span>
                    </Checkbox>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* <Button
            style={{
              backgroundColor: data.isEditable ? '#6B47ED' : '#D4CCF7',
              fontFamily: 'Nunito', // Ensure Nunito font is loaded in your project
              fontSize: '18px',
              fontWeight: 600,
              lineHeight: '25px',
              letterSpacing: '0px',
              textAlign: 'center',
              color: 'white', // Assuming you want the text color to be white
            }}
            className={`w-[200px] h-[57px] px-6 py-4 rounded-full flex items-center justify-center gap-2 disabled:cursor-not-allowed`}
            onClick={processFormData}
            disabled={!data.isEditable}
          >
            Process
          </Button> */}
          <Button
            style={{
              backgroundColor: data.isEditable ? '#6B47ED' : '#D4CCF7',
              fontFamily: 'Nunito, sans-serif', // Specify fallback fonts
              fontSize: '18px',
              fontWeight: 600,
              lineHeight: '25px',
              letterSpacing: '0px',
              textAlign: 'center',
              color: 'white', // Text color
              borderRadius: '9999px', // For a fully rounded button, if not using Tailwind
              padding: '16px 24px', // Adjust based on your design requirements
            }}
            className={`w-[200px] h-[57px] px-6 py-4 rounded-full flex items-center justify-center gap-2 disabled:cursor-not-allowed`}
            onClick={processFormData}
            disabled={!data.isEditable}
          >
            Process
          </Button>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default App;
