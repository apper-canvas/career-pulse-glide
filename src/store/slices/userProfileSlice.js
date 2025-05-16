import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Initial state for user profile
const initialState = {
  profile: {
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    dateOfBirth: '',
    
    // Professional Information
    headline: '',
    title: '',
    company: '',
    yearsOfExperience: '',
    education: '',
    skills: [],
    bio: '',
    website: '',
    certifications: '',
    languages: '',
    
    // Social Links
    socialLinks: {
      linkedIn: '',
      github: ''
    }
  },
  jobPreferences: {
    desiredTitle: '',
    desiredLocation: '',
    desiredIndustry: '',
    salaryExpectation: '',
    workType: 'Full-time',
    remotePreference: 'Hybrid',
    relocationWillingness: false
  },
  resumes: [],
  isLoading: false,
  error: null
};

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    updateProfile: (state, action) => {
      state.profile = { ...state.profile, ...action.payload };
    },
    updateJobPreferences: (state, action) => {
      state.jobPreferences = { ...state.jobPreferences, ...action.payload };
    },
    addResume: (state, action) => {
      state.resumes.push(action.payload);
    },
    removeResume: (state, action) => {
      state.resumes = state.resumes.filter(resume => resume.id !== action.payload);
    }
  }
});

export const { updateProfile, updateJobPreferences, addResume, removeResume } = userProfileSlice.actions;
export default userProfileSlice.reducer;