import { useState, useEffect, useContext } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../App"; 

const EditJobPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isAuthenticated } = useContext(AuthContext);
  const [jobData, setJobData] = useState({
    title: "",
    company: "",
    location: "",
    jobType: "",
    description: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`/api/jobs/${id}`); 
        setJobData(response.data);
      } catch (error) {
        console.error("Error fetching job:", error);
        setError(error.response?.data?.message || "Failed to fetch job.");
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchJob();
    }
  }, [id, isAuthenticated]);

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/jobs/${id}`, jobData, {
        headers: { Authorization: `Bearer ${isAuthenticated.token}` },
      });
      console.log("Job updated:", response.data);
      navigate("/"); 
    } catch (error) {
      console.error("Error updating job:", error);
      setError(error.response?.data?.message || "Failed to update job.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4} p={3} boxShadow={2}>
        <Typography variant="h4" align="center" gutterBottom>
          Edit Job
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "300px",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* Job Title */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Job Title"
                  name="title"
                  value={jobData.title}
                  onChange={handleChange}
                  required
                />
              </Grid>

              {/* Company */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Company"
                  name="company"
                  value={jobData.company}
                  onChange={handleChange}
                  required
                />
              </Grid>

              {/* Location */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Location"
                  name="location"
                  value={jobData.location}
                  onChange={handleChange}
                  required
                />
              </Grid>

              {/* Job Type */}
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="jobType-label">Job Type</InputLabel>
                  <Select
                    labelId="jobType-label"
                    id="jobType"
                    name="jobType"
                    value={jobData.jobType}
                    label="Job Type"
                    onChange={handleChange}
                    required
                  >
                    <MenuItem value="Full-time">Full-time</MenuItem>
                    <MenuItem value="Part-time">Part-time</MenuItem>
                    <MenuItem value="Remote">Remote</MenuItem>
                    <MenuItem value="Contract">Contract</MenuItem>
                    <MenuItem value="Internship">Internship</MenuItem>
                    {/* Add more job types as needed */}
                  </Select>
                </FormControl>
              </Grid>

              {/* Job Description */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Job Description"
                  name="description"
                  multiline
                  rows={4}
                  value={jobData.description}
                  onChange={handleChange}
                  required
                />
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12} align="end">
                <Button size="large" variant="contained" color="primary" type="submit">
                  Update Job
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Box>
    </Container>
  );
};

export default EditJobPage;
