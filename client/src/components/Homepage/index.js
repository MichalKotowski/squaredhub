import { Grid, Typography } from '@mui/material'
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab'
import { ModeOfTravel, QuestionMark, ContentPasteSearch, AutoGraph, SelfImprovement } from '@mui/icons-material'
import heroImage from '../../assets/images/hero-image.svg'
import style from './style.module.scss'

const Homepage = () => {
	return (
		<>
			<Grid container justifyContent='space-between' alignItems='center' maxWidth='md'>
				<Grid item xs={7}>
					<Typography variant='h3' gutterBottom>
						Improve yourself<br />
						<span className={style.unique}>one square</span> at a time
					</Typography>
					<Typography variant='body1'>
						They say it takes 10000 hours to master a skill. <strong>Squared Hub</strong> is a tool that will help you measure the time spent on certain activities of your choice. Visualize your progress and see, how commited you are to the things that are important to you.
					</Typography>
				</Grid>
				<Grid item xs={'220px'} sx={{ fontSize: 0 }}>
					<img src={heroImage} alt='Colorful squares' />
				</Grid>
			</Grid>
			<Grid container justifyContent='center' maxWidth='md' sx={{ marginTop: '4em' }}>
				<Timeline position="alternate">
					<TimelineItem>
						<TimelineSeparator>
							<TimelineConnector />
							<TimelineDot color="primary">
								<ModeOfTravel />
							</TimelineDot>
							<TimelineConnector />
						</TimelineSeparator>
						<TimelineContent sx={{ py: '12px', px: 2 }}>
							<Typography variant="h6" component="span">
								Destination
							</Typography>
							<Typography>Ask yourself where you want to be in one year?</Typography>
						</TimelineContent>
					</TimelineItem>
					<TimelineItem>
						<TimelineSeparator>
							<TimelineConnector />
							<TimelineDot color="primary">
								<QuestionMark />
							</TimelineDot>
							<TimelineConnector />
						</TimelineSeparator>
						<TimelineContent sx={{ py: '12px', px: 2 }}>
							<Typography variant="h6" component="span">
								Resolution
							</Typography>
							<Typography>On what you should focus to make your dream true?</Typography>
						</TimelineContent>
					</TimelineItem>
					<TimelineItem>
						<TimelineSeparator>
							<TimelineConnector />
							<TimelineDot color="primary" variant="outlined">
								<ContentPasteSearch />
							</TimelineDot>
							<TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
						</TimelineSeparator>
						<TimelineContent sx={{ py: '12px', px: 2 }}>
							<Typography variant="h6" component="span">
								Implementation
							</Typography>
							<Typography>Use <strong>Squared Hub</strong> to track your learning milestones</Typography>
						</TimelineContent>
					</TimelineItem>
					<TimelineItem>
						<TimelineSeparator>
							<TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
							<TimelineDot color="secondary">
								<AutoGraph />
							</TimelineDot>
							<TimelineConnector />
						</TimelineSeparator>
						<TimelineContent sx={{ py: '12px', px: 2 }}>
							<Typography variant="h6" component="span">
								Motivation
							</Typography>
							<Typography>Observe statistics to observe how your hard work pays off</Typography>
						</TimelineContent>
					</TimelineItem>
					<TimelineItem>
						<TimelineSeparator>
							<TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
							<TimelineDot color="secondary">
								<SelfImprovement />
							</TimelineDot>
							<TimelineConnector />
						</TimelineSeparator>
						<TimelineContent sx={{ py: '12px', px: 2 }}>
							<Typography variant="h6" component="span">
								Self realization
							</Typography>
							<Typography>Be proud of who are you becoming</Typography>
						</TimelineContent>
					</TimelineItem>
				</Timeline>
			</Grid>
			<Grid container justifyContent='center' maxWidth='md' sx={{ marginTop: '4em' }}>
				<Typography variant='body1' maxWidth='sm' sx={{ textAlign: 'center' }}>
					Hey! I'd be more than happy to work together on this project. If you like to collaborate, let me know via <a href='mailto:hello@michalkotowski.pl'>email</a> or by making a pull request to the repository located <a href='https://github.com/MichalKotowski/squaredhub' target='_blank' rel='noreferrer'>here</a>
				</Typography>
			</Grid>
		</>
	)
}

export default Homepage