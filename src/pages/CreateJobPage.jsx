import { useState, useContext } from 'react';
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
} from '@mui/material';
import { AuthContext } from '../App';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateJobPage = () => {
  const { token } = useContext(AuthContext);
  const [jobData, setJobData] = useState({
    title: '',
    company: '',
    location: '',
    jobType: '',
    description: '',
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate()

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); 

    try {
      const response = await axios.post('/api/jobs', jobData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log('Job created:', response.data);
      // redirect to the job listing page
      navigate('/')
      setJobData({ title: '', company: '', location: '', jobType: '', description: '' });
    } catch (error) {
      console.error('Error creating job:', error);
      setError(error.response?.data?.message || 'Failed to create job.');
    }
  };

  return (
    <Container maxWidth="sm" >
      <Box mt={4} p={3} boxShadow={2}>
        <Typography variant="h4" align="center" gutterBottom>
          Create a New Job
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}

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
              <Button size='large' variant="contained" color="primary" type="submit">
                Create Job
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default CreateJobPage;
