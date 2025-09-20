import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { FormProvider, useForm } from 'react-hook-form'
import { FiClock, FiMail, FiMapPin, FiMessageCircle, FiPhone, FiSend } from 'react-icons/fi'
import { z } from 'zod'

import { FormItem } from '@/shared/components/form/FormItem'
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

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactFormData = z.infer<typeof contactSchema>

const contactInfo = [
  {
    icon: FiMail,
    title: 'Email',
    value: 'hello@reacttemplate.com',
    description: 'Send us an email anytime',
  },
  {
    icon: FiPhone,
    title: 'Phone',
    value: '+1 (555) 123-4567',
    description: 'Mon-Fri from 8am to 5pm',
  },
  {
    icon: FiMapPin,
    title: 'Office',
    value: 'San Francisco, CA',
    description: '123 Tech Street, Suite 100',
  },
]

const faqs = [
  {
    question: 'How do I get started with the template?',
    answer:
      'Simply clone the repository, install dependencies with npm/yarn, and start developing! Our documentation provides detailed setup instructions.',
  },
  {
    question: 'Is the template suitable for production?',
    answer:
      'Absolutely! The template includes production-ready configurations, testing setup, and deployment guidelines.',
  },
  {
    question: 'Can I customize the design system?',
    answer:
      'Yes, the template uses Tailwind CSS and includes a customizable design system with your own colors, fonts, and components.',
  },
  {
    question: 'Do you provide support?',
    answer:
      'We offer community support through GitHub issues and discussions. Premium support is available for enterprise customers.',
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
            Get In
            <span className="bg-brand-gradient bg-clip-text text-transparent"> Touch</span>
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="mb-8 text-lg leading-relaxed text-muted-foreground sm:text-xl"
          >
            Have questions, feedback, or want to collaborate? We'd love to hear from you. Drop us a
            message and we'll respond as soon as possible.
          </motion.p>
        </motion.div>
      </Container>
    </section>
  )
}

function ContactInfoCards() {
  return (
    <section className="py-20">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="mb-20 grid grid-cols-1 gap-8 md:grid-cols-3"
        >
          {contactInfo.map((info) => {
            const Icon = info.icon
            return (
              <motion.div key={info.title} variants={itemVariants}>
                <Card className="border-2 text-center transition-shadow duration-300 hover:border-primary/20 hover:shadow-lg">
                  <CardHeader>
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10"
                    >
                      <Icon className="h-8 w-8 text-primary" />
                    </motion.div>
                    <CardTitle className="text-xl">{info.title}</CardTitle>
                    <CardDescription className="font-semibold text-primary">
                      {info.value}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{info.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </Container>
    </section>
  )
}

function ContactForm() {
  const methods = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = methods

  const onSubmit = async (data: ContactFormData) => {
    console.log('Contact form submitted:', data)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    reset()
    alert("Message sent successfully! We'll get back to you soon.")
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <FiMessageCircle className="mr-2 h-6 w-6" />
              Send us a message
            </CardTitle>
            <CardDescription>
              Fill out the form below and we'll get back to you within 24 hours.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <FormItem.Input name="name" label="Name *" placeholder="Your name" required />
                  <FormItem.Input
                    name="email"
                    label="Email *"
                    type="email"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <FormItem.Input
                  name="subject"
                  label="Subject *"
                  placeholder="What's this about?"
                  required
                />

                <FormItem.TextArea
                  name="message"
                  label="Message *"
                  placeholder="Tell us more about your inquiry..."
                  rows={6}
                  required
                />

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button type="submit" disabled={isSubmitting} className="w-full" size="lg">
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="mr-2"
                        >
                          <FiClock className="h-4 w-4" />
                        </motion.div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <FiSend className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>
            </FormProvider>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

function FAQSection() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <motion.div variants={itemVariants} className="mb-8">
        <h3 className="mb-2 text-2xl font-bold">Frequently Asked Questions</h3>
        <p className="text-muted-foreground">
          Can't find what you're looking for? Contact us directly.
        </p>
      </motion.div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{faq.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed text-muted-foreground">{faq.answer}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div variants={itemVariants} className="mt-8 rounded-lg bg-muted/20 p-6">
        <h4 className="mb-2 flex items-center font-semibold">
          <FiClock className="mr-2 h-4 w-4" />
          Response Times
        </h4>
        <div className="space-y-1 text-sm text-muted-foreground">
          <div>• General inquiries: Within 24 hours</div>
          <div>• Technical support: Within 48 hours</div>
          <div>• Partnership requests: Within 3–5 business days</div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function ContactPage() {
  return (
    <Layout>
      <HeroSection />
      <ContactInfoCards />
      <section className="pb-20">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <ContactForm />
            <FAQSection />
          </div>
        </Container>
      </section>
    </Layout>
  )
}
