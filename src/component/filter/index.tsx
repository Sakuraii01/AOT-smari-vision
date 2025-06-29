import { Autocomplete, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
export const OverallFilter = () => {
  return (
    <div className="flex gap-3">
      <Autocomplete
        disablePortal
        options={Airport}
        sx={{ width: 300 }}
        value={{ label: "Chiang Mai (CNX)", value: "cnx" }}
        renderInput={(params) => <TextField {...params} label="Airport" />}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker label="From" defaultValue={dayjs("2018-08-1")} />
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker label="To" defaultValue={dayjs("2018-08-12")} />
      </LocalizationProvider>
    </div>
  );
};

const Airport = [
  { label: "Chiang Mai (CNX)", value: "cnx" },
  { label: "Suvarnabhumi Airport (BKK)", value: "BKK" },
  { label: "Don Muang (DMK)", value: "dmk" },
];

export const RetailFilter = () => {
  return (
    <div>
      <Autocomplete
        disablePortal
        options={Retail}
        sx={{ width: 300 }}
        value={{ label: "Retail A", value: "a" }}
        renderInput={(params) => <TextField {...params} label="Retail" />}
      />
    </div>
  );
};
const Retail = [
  { label: "Retail A", value: "a" },
  { label: "Retail B", value: "b" },
  { label: "Retail C", value: "c" },
];
