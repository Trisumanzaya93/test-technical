import React, { useEffect, useState } from "react";
import {
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getUser } from "./utils";

const App = () => {
  const [formData, setFormData] = useState({
    width: 0,
    height: 0,
    radius: 0,
    base: 0,
    shape: "rectangle",
  });
  const [hasil, setHasil] = useState(0);
  const [type, setType] = useState([
    { value: "rectangle", name: "Persegi Panjang" },
  ]);
  const [selectName, setSelectName] = useState("Persegi Panjang");

  const [dataUser, setDataUser] = useState([]);

  const handleChangeSelect = (event) => {
    const dataSelect = event.target.value;
    const filtered = type.filter((item) => item.name === dataSelect.name);
    if (filtered.length === 0) {
      // let body = type
      // body.push(dataSelect)
      // console.log(body);
      setSelectName(dataSelect.name);
      setType([...type, dataSelect]);
    }
    // setType(event.target.value);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let result;
    if (formData.shape === "rectangle") {
      result = formData.width * formData.height;
    } else if (formData.shape === "circle") {
      result = Math.PI * formData.radius ** 2;
    } else if (formData.shape === "triangle") {
      result = (formData.base * formData.height) / 2;
    }
    setHasil(result);
    // alert(`Hasil perhitungan luas adalah ${result}`);
  };
  const getUserList = async () => {
    try {
      const payload = {
        limit: 100,
        skip: 0,
      };
      const result = await getUser(payload);
      console.log(result.data.users);
      const data = result.data.users;
      const filtered = data.filter((item) => item.age >= 30 && item.age <= 60);
      console.log("wokehhh", filtered);
      setDataUser(filtered);
      // setMeta(result.data)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserList();
  }, []);

  return (
    <>
      <Container>
        <form onSubmit={handleSubmit}>
          <div style={{ width: "100%", height: "100%", marginTop: "20px" }}>
            <FormControl>
              <FormLabel>Soal 1:</FormLabel>
              <RadioGroup
                row
                name="shape"
                value={formData.shape}
                onChange={handleChange}
              >
                {type.map((item) => {
                  console.log(item);
                  return (
                    <FormControlLabel
                      value={item.value}
                      control={<Radio />}
                      label={item.name}
                      sx={{ marginRight: "50px" }}
                    />
                  );
                })}
                {/* <FormControlLabel value="rectangle" control={<Radio />} label="Persegi panjang" sx={{marginRight:'50px'}} />
          <FormControlLabel value="circle" control={<Radio />} label="Lingkaran" /> */}
              </RadioGroup>
            </FormControl>
            <InputLabel id="demo-simple-select-label">Tambah Rumus</InputLabel>
            <Select
              // labelId="demo-simple-select-label"
              // id="demo-simple-select"
              // defaultValue={selectName}
              value={selectName}
              onChange={handleChangeSelect}
            >
              <MenuItem value={{ value: "rectangle", name: "Persegi Panjang" }}>
                Persegi Panjang
              </MenuItem>
              <MenuItem value={{ value: "circle", name: "Linkaran" }}>
                Linkaran
              </MenuItem>
              <MenuItem value={{ value: "triangle", name: "Segitiga" }}>
                Segitiga
              </MenuItem>
            </Select>
          </div>
          <div style={{ width: "100%", height: "100%", marginTop: "50px" }}>
            {formData.shape === "triangle" && (
              <>
                <TextField
                  label="Masukkan Alas"
                  type="number"
                  name="base"
                  value={formData.base}
                  onChange={handleChange}
                  sx={{ marginRight: "50px" }}
                />
                <TextField
                  label="Masukkan tinggi"
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                />
              </>
            )}
            {formData.shape === "rectangle" && (
              <>
                <TextField
                  label="Masukkan lebar"
                  type="number"
                  name="width"
                  value={formData.width}
                  onChange={handleChange}
                  sx={{ marginRight: "50px" }}
                />
                <TextField
                  label="Masukkan tinggi"
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                />
              </>
            )}
            {formData.shape === "circle" && (
              <TextField
                label="Masukkan jari-jari"
                type="number"
                name="radius"
                value={formData.radius}
                onChange={handleChange}
              />
            )}
          </div>
          <Button
            type="submit"
            variant="contained"
            sx={{ marginTop: "20px", marginBottom: "20px" }}
          >
            Hitung luas
          </Button>
        </form>
        <FormLabel>Nilai : {hasil} cm</FormLabel>
        <Box sx={{ marginTop: "20px", marginBottom: "20px" }}>
          <FormLabel sx={{ marginTop: "20px", marginBottom: "20px" }}>
            Soal 2
          </FormLabel>
          <Box sx={{ marginTop: "20px", marginBottom: "20px" }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="left">Address</TableCell>
                    <TableCell align="left">age</TableCell>
                    {/* <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataUser.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.firstName} {row.lastName}
                      </TableCell>
                      <TableCell align="left">{row.address.address}</TableCell>
                      <TableCell align="left">{row.age}</TableCell>
                      {/* <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell> */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>

        <Box
          sx={{
            marginTop: "20px",
            marginBottom: "20px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <FormLabel sx={{ marginTop: "20px", marginBottom: "20px" }}>
            Soal 3
          </FormLabel>
          <FormLabel>
            Untuk menyewa ruangan di gedung sebagai restoran beberapa data yang
            dibutuhkan antara lain :
          </FormLabel>
          <FormLabel>1. Identitas pribadi</FormLabel>
          <FormLabel>2. Surat pernyataan</FormLabel>
          <FormLabel>3. Proposal bisnis</FormLabel>
          <FormLabel>4. Dokumen izin usaha</FormLabel>
          <FormLabel>5. Dokumen keamanan</FormLabel>
        </Box>
      </Container>
    </>
  );
};

export default App;
