import { motion } from 'framer-motion'
import { FiAward, FiCode, FiHeart, FiTarget, FiTrendingUp, FiUsers } from 'react-icons/fi'

import { Container } from '@/shared/components/layout/Container'
import { Layout } from '@/shared/components/layout/Layout'
import { Button } from '@/shared/components/ui/Button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/Card'

const stats = [
  { icon: FiUsers, label: 'Active Users', value: '10K+' },
  { icon: FiCode, label: 'Projects Built', value: '50K+' },
  { icon: FiAward, label: 'Awards Won', value: '25+' },
  { icon: FiTrendingUp, label: 'Growth Rate', value: '150%' },
]

const values = [
  {
    icon: FiCode,
    title: 'Innovation',
    description:
      "We constantly push the boundaries of what's possible with modern web technologies.",
  },
  {
    icon: FiHeart,
    title: 'Quality',
    description: 'Every line of code is crafted with care and attention to detail.',
  },
  {
    icon: FiUsers,
    title: 'Community',
    description: 'We believe in building together and sharing knowledge with everyone.',
  },
  {
    icon: FiTarget,
    title: 'Purpose',
    description: 'Our mission is to make web development accessible and enjoyable for all.',
  },
]

const team = [
  {
    name: 'John Doe',
    role: 'Lead Developer',
    image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    bio: 'Full-stack developer with 8+ years of experience in React and Node.js',
  },
  {
    name: 'Jane Smith',
    role: 'UI/UX Designer',
    image:
      'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    bio: 'Design expert focused on creating beautiful and intuitive user experiences',
  },
  {
    name: 'Mike Johnson',
    role: 'DevOps Engineer',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    bio: 'Infrastructure specialist ensuring scalable and reliable deployments',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

function HeroSection() {
  return (
    <section className="bg-gradient-to-b from-muted/20 to-background py-20 sm:py-32">
      <Container>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.h1 variants={itemVariants} className="mb-6 text-4xl font-bold sm:text-6xl">
            About <span className="bg-brand-gradient bg-clip-text text-transparent">Us</span>
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="mb-8 text-lg leading-relaxed text-muted-foreground sm:text-xl"
          >
            We're passionate developers building the future of web development, one amazing template
            at a time.
          </motion.p>
        </motion.div>
      </Container>
    </section>
  )
}

function StatsSection() {
  return (
    <section className="py-20">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-2 gap-8 lg:grid-cols-4"
        >
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <motion.div key={stat.label} variants={itemVariants} className="text-center">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10"
                >
                  <Icon className="h-8 w-8 text-primary" />
                </motion.div>
                <div className="mb-2 text-3xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            )
          })}
        </motion.div>
      </Container>
    </section>
  )
}

function StorySection() {
  return (
    <section className="bg-muted/20 py-20">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="mx-auto max-w-4xl text-muted-foreground">
            <h2 className="mb-8 text-center text-3xl font-bold sm:text-4xl">Our Story</h2>
            <div className="prose prose-lg max-w-none">
              <motion.p variants={itemVariants} className="mb-6 text-lg leading-relaxed">
                It all started with a simple idea: what if we could make web development faster,
                more enjoyable, and accessible to everyone? As developers ourselves, we knew the
                pain of setting up projects from scratch, dealing with configuration headaches, and
                struggling with outdated boilerplates.
              </motion.p>
              <motion.p variants={itemVariants} className="mb-6 text-lg leading-relaxed">
                That's why we created this React + TypeScript starter template. We wanted to build
                something that would save developers countless hours while providing the modern
                tools and best practices needed for today's web applications.
              </motion.p>
              <motion.p variants={itemVariants} className="text-lg leading-relaxed">
                Today, our template has helped thousands of developers kickstart their projects,
                from small personal sites to large enterprise applications. We're proud to be part
                of their success stories.
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}

function ValuesSection() {
  return (
    <section className="py-20">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Our Values</h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              These core principles guide everything we do and shape how we build products.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {values.map((value) => {
              const Icon = value.icon
              return (
                <motion.div key={value.title} variants={itemVariants}>
                  <Card className="h-full transition-shadow duration-300 hover:shadow-lg">
                    <CardHeader>
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10"
                      >
                        <Icon className="h-6 w-6 text-primary" />
                      </motion.div>
                      <CardTitle className="text-xl">{value.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base leading-relaxed">
                        {value.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </Container>
    </section>
  )
}

function TeamSection() {
  return (
    <section className="bg-muted/20 py-20">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Meet Our Team</h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              The amazing people behind this template who work tirelessly to make it better.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {team.map((member) => (
              <motion.div key={member.name} variants={itemVariants}>
                <Card className="text-center transition-shadow duration-300 hover:shadow-lg">
                  <CardHeader>
                    <motion.div whileHover={{ scale: 1.05 }} className="mx-auto mb-4 h-24 w-24">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="h-full w-full rounded-full border-4 border-background object-cover shadow-lg"
                      />
                    </motion.div>
                    <CardTitle className="text-xl">{member.name}</CardTitle>
                    <CardDescription className="font-medium text-primary">
                      {member.role}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-muted-foreground">{member.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  )
}

function CTASection() {
  return (
    <section className="py-20">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.h2 variants={itemVariants} className="mb-6 text-3xl font-bold sm:text-4xl">
            Ready to work together?
          </motion.h2>
          <motion.p variants={itemVariants} className="mb-8 text-lg text-muted-foreground">
            Whether you have questions, feedback, or just want to say hello, we'd love to hear from
            you.
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button size="lg">Get In Touch</Button>
            <Button variant="outline" size="lg">
              View Our Work
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}

export function AboutPage() {
  return (
    <Layout>
      <HeroSection />
      <StatsSection />
      <StorySection />
      <ValuesSection />
      <TeamSection />
      <CTASection />
    </Layout>
  )
}
