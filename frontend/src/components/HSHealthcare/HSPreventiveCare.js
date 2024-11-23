import React from 'react';
import { Container, Typography, Paper, Grid, Card, CardContent } from '@mui/material';
import { styled } from '@mui/system'; // Import styled from @mui/system

// Custom styles using styled from @mui/system
const CustomContainer = styled(Container)({
  padding: '40px 20px',
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  minHeight: '100vh',
});

const HeaderTypography = styled(Typography)({
  color: '#388e3c',
  fontWeight: 'bold',
  marginBottom: '20px',
});

const SubheaderTypography = styled(Typography)({
  color: '#555',
  marginBottom: '40px',
});

const StyledCard = styled(Card)({
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.03)',
  },
});

const CardTitleTypography = styled(Typography)({
  color: '#00695c',
  fontWeight: 'bold',
});

const StyledPaper = styled(Paper)({
  padding: '30px',
  marginTop: '50px',
  backgroundColor: '#e0f2f1',
  borderRadius: '12px',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
});

const PaperTextTypography = styled(Typography)({
  color: '#004d40',
  fontSize: '18px',
});

const preventiveCareTips = [
  {
    title: 'Stay Up to Date with Vaccines',
    content:
      'Ensure you are up to date with essential vaccines, including flu shots, tetanus, hepatitis, and the COVID-19 vaccine. Regular vaccination helps in the prevention of infectious diseases.',
  },
  {
    title: 'Health Screenings',
    content:
      'Routine health screenings such as blood pressure, cholesterol, and cancer screenings help in early detection and prevention of serious health issues. Talk to your healthcare provider about the screenings appropriate for your age and health history.',
  },
  {
    title: 'Maintain a Balanced Diet',
    content:
      'A healthy diet rich in fruits, vegetables, whole grains, and lean proteins plays a key role in preventing chronic diseases such as diabetes and heart disease. Stay hydrated and limit processed foods.',
  },
  {
    title: 'Stay Active',
    content:
      'Regular physical activity reduces the risk of chronic diseases and improves overall health. Aim for at least 30 minutes of moderate exercise most days of the week.',
  },
  {
    title: 'Health Campaigns & Events',
    content:
      'Keep an eye out for ongoing health campaigns like World Health Day, Immunization Week, and Breast Cancer Awareness Month. These campaigns promote awareness and provide valuable resources on preventive care.',
  },
];

const PreventiveCare = () => {
  return (
    <>
    <header className="hsheader">
        <div className="hslogo-title">
          <img src="/hslogo.png" alt="Logo" className="hslogo" />
          <Typography variant="h2" className="hsheader-title">
            Panadura Municipal Council
          </Typography>
        </div>
      </header>
      
    <CustomContainer>
      <HeaderTypography variant="h2" gutterBottom>
        Preventive Care
      </HeaderTypography>
      <SubheaderTypography variant="h5" paragraph>
        Stay informed with ongoing health campaigns, receive preventive care tips, and get reminders for vaccines and screenings.
      </SubheaderTypography>

      {/* Health Tips Section */}
      <HeaderTypography variant="h4" gutterBottom>
        Preventive Care Tips
      </HeaderTypography>
      <Grid container spacing={3}>
        {preventiveCareTips.map((tip, index) => (
          <Grid item xs={12} md={6} key={index}>
            <StyledCard elevation={3}>
              <CardContent>
                <CardTitleTypography variant="h6" gutterBottom>
                  {tip.title}
                </CardTitleTypography>
                <Typography variant="body1">{tip.content}</Typography>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>

      {/* Additional Information Section */}
      <StyledPaper>
        <Typography variant="h5" gutterBottom>
          Get Vaccination & Screening Reminders
        </Typography>
        <PaperTextTypography paragraph>
          Stay on top of your health by receiving reminders for upcoming vaccinations and health screenings. Regular checkups and early detection are crucial to maintaining long-term health.
        </PaperTextTypography>
        <PaperTextTypography paragraph>
          Contact your healthcare provider to learn more about personalized preventive care strategies and make sure you’re enrolled in your national vaccination program.
        </PaperTextTypography>
      </StyledPaper>
    </CustomContainer>
    </>
  );
};

export default PreventiveCare;
