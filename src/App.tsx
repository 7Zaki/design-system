import { useState } from 'react'
import {
  Button, Input, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
  Badge, Avatar, AvatarGroup,
  Container, VStack, HStack, Grid, GridItem,
  Spinner, Alert, Modal, ToastProvider, useToast, Tooltip,
  Heading, Text, Code, Divider,
} from './design-system'

function ToastDemo() {
  const { toast } = useToast()
  return (
    <HStack gap="2" wrap>
      <Button size="sm" variant="secondary" onClick={() => toast({ title: 'Info', message: 'This is an info message.', variant: 'info' })}>Info Toast</Button>
      <Button size="sm" variant="secondary" onClick={() => toast({ title: 'Success', message: 'Action completed!', variant: 'success' })}>Success Toast</Button>
      <Button size="sm" variant="secondary" onClick={() => toast({ title: 'Warning', message: 'Proceed with caution.', variant: 'warning' })}>Warning Toast</Button>
      <Button size="sm" variant="secondary" onClick={() => toast({ title: 'Error', message: 'Something went wrong.', variant: 'danger' })}>Danger Toast</Button>
    </HStack>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">{title}</h2>
      {children}
    </section>
  )
}

// ─── Foundation showcase helpers ────────────────────────────────────────────

const colorGroups = [
  {
    name: 'Primary',
    shades: [
      { label: '50',  bg: 'bg-primary-50',  hex: '#eff6ff', dark: false },
      { label: '100', bg: 'bg-primary-100', hex: '#dbeafe', dark: false },
      { label: '200', bg: 'bg-primary-200', hex: '#bfdbfe', dark: false },
      { label: '300', bg: 'bg-primary-300', hex: '#93c5fd', dark: false },
      { label: '400', bg: 'bg-primary-400', hex: '#60a5fa', dark: false },
      { label: '500', bg: 'bg-primary-500', hex: '#3b82f6', dark: true  },
      { label: '600', bg: 'bg-primary-600', hex: '#2563eb', dark: true  },
      { label: '700', bg: 'bg-primary-700', hex: '#1d4ed8', dark: true  },
      { label: '800', bg: 'bg-primary-800', hex: '#1e40af', dark: true  },
      { label: '900', bg: 'bg-primary-900', hex: '#1e3a8a', dark: true  },
    ],
  },
  {
    name: 'Gray',
    shades: [
      { label: '50',  bg: 'bg-gray-50',  hex: '#f9fafb', dark: false },
      { label: '100', bg: 'bg-gray-100', hex: '#f3f4f6', dark: false },
      { label: '200', bg: 'bg-gray-200', hex: '#e5e7eb', dark: false },
      { label: '300', bg: 'bg-gray-300', hex: '#d1d5db', dark: false },
      { label: '400', bg: 'bg-gray-400', hex: '#9ca3af', dark: false },
      { label: '500', bg: 'bg-gray-500', hex: '#6b7280', dark: true  },
      { label: '600', bg: 'bg-gray-600', hex: '#4b5563', dark: true  },
      { label: '700', bg: 'bg-gray-700', hex: '#374151', dark: true  },
      { label: '800', bg: 'bg-gray-800', hex: '#1f2937', dark: true  },
      { label: '900', bg: 'bg-gray-900', hex: '#111827', dark: true  },
    ],
  },
  {
    name: 'Semantic',
    shades: [
      { label: 'Success 500', bg: 'bg-green-500',  hex: '#22c55e', dark: true  },
      { label: 'Warning 500', bg: 'bg-yellow-500', hex: '#f59e0b', dark: false },
      { label: 'Danger 500',  bg: 'bg-red-500',    hex: '#ef4444', dark: true  },
      { label: 'Info 500',    bg: 'bg-blue-500',   hex: '#3b82f6', dark: true  },
    ],
  },
]

const typeScale = [
  { label: 'Display / 4xl', cls: 'text-4xl font-bold',     size: '2.25rem / 36px' },
  { label: 'H1 / 3xl',      cls: 'text-3xl font-semibold', size: '1.875rem / 30px' },
  { label: 'H2 / 2xl',      cls: 'text-2xl font-semibold', size: '1.5rem / 24px'   },
  { label: 'H3 / xl',       cls: 'text-xl font-semibold',  size: '1.25rem / 20px'  },
  { label: 'H4 / lg',       cls: 'text-lg font-medium',    size: '1.125rem / 18px' },
  { label: 'Body / base',   cls: 'text-base font-normal',  size: '1rem / 16px'     },
  { label: 'Small / sm',    cls: 'text-sm font-normal',    size: '0.875rem / 14px' },
  { label: 'Caption / xs',  cls: 'text-xs font-normal',    size: '0.75rem / 12px'  },
]

const spacingScale = [
  { label: '1',  cls: 'w-1',  value: '4px'   },
  { label: '2',  cls: 'w-2',  value: '8px'   },
  { label: '3',  cls: 'w-3',  value: '12px'  },
  { label: '4',  cls: 'w-4',  value: '16px'  },
  { label: '5',  cls: 'w-5',  value: '20px'  },
  { label: '6',  cls: 'w-6',  value: '24px'  },
  { label: '8',  cls: 'w-8',  value: '32px'  },
  { label: '10', cls: 'w-10', value: '40px'  },
  { label: '12', cls: 'w-12', value: '48px'  },
  { label: '16', cls: 'w-16', value: '64px'  },
  { label: '20', cls: 'w-20', value: '80px'  },
  { label: '24', cls: 'w-24', value: '96px'  },
  { label: '32', cls: 'w-32', value: '128px' },
]

const shadowScale = [
  { label: 'sm',  cls: 'shadow-sm',  desc: '0 1px 2px' },
  { label: 'md',  cls: 'shadow-md',  desc: '0 4px 6px'  },
  { label: 'lg',  cls: 'shadow-lg',  desc: '0 10px 15px' },
  { label: 'xl',  cls: 'shadow-xl',  desc: '0 20px 25px' },
  { label: '2xl', cls: 'shadow-2xl', desc: '0 25px 50px' },
]

const radiiScale = [
  { label: 'none', cls: 'rounded-none', value: '0px'     },
  { label: 'sm',   cls: 'rounded-sm',   value: '2px'     },
  { label: 'md',   cls: 'rounded-md',   value: '6px'     },
  { label: 'lg',   cls: 'rounded-lg',   value: '8px'     },
  { label: 'xl',   cls: 'rounded-xl',   value: '12px'    },
  { label: '2xl',  cls: 'rounded-2xl',  value: '16px'    },
  { label: '3xl',  cls: 'rounded-3xl',  value: '24px'    },
  { label: 'full', cls: 'rounded-full', value: '9999px'  },
]

export default function App() {
  const [modalOpen, setModalOpen] = useState(false)
  const [inputVal, setInputVal] = useState('')

  return (
    <ToastProvider>
      <div className="min-h-screen bg-gray-50 py-12">
        <Container maxWidth="xl">
          <VStack gap="12">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Design System</h1>
              <p className="text-gray-500 mt-2">React + TypeScript + Tailwind CSS</p>
            </div>

            {/* ── FOUNDATION ─────────────────────────────────────────────── */}

            {/* Color Palette */}
            <Section title="Foundation — Colors">
              <VStack gap="8">
                {colorGroups.map((group) => (
                  <div key={group.name}>
                    <Text size="sm" weight="medium" color="muted" className="mb-3">{group.name}</Text>
                    <div className="flex flex-wrap gap-2">
                      {group.shades.map((s) => (
                        <div key={s.label} className="flex flex-col items-center gap-1">
                          <div className={`h-12 w-16 rounded-lg ${s.bg} border border-black/5`} />
                          <Text size="xs" color="muted">{s.label}</Text>
                          <Text size="xs" color="subtle" className="font-mono">{s.hex}</Text>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </VStack>
            </Section>

            {/* Typography Scale */}
            <Section title="Foundation — Typography">
              <VStack gap="6">
                <Card variant="outlined" padding="lg">
                  <VStack gap="5">
                    {typeScale.map((t) => (
                      <div key={t.label} className="flex items-baseline justify-between gap-4 py-2 border-b border-gray-100 last:border-0">
                        <p className={`${t.cls} text-gray-900 flex-1`}>
                          The quick brown fox
                        </p>
                        <div className="text-right shrink-0">
                          <Text size="xs" weight="medium" color="muted">{t.label}</Text>
                          <Text size="xs" color="subtle" className="font-mono">{t.size}</Text>
                        </div>
                      </div>
                    ))}
                  </VStack>
                </Card>

                <div>
                  <Text size="sm" weight="medium" color="muted" className="mb-3">Font Weights</Text>
                  <HStack gap="6" wrap>
                    {(['light', 'normal', 'medium', 'semibold', 'bold'] as const).map((w) => (
                      <div key={w} className="text-center">
                        <Text size="2xl" weight={w}>Aa</Text>
                        <Text size="xs" color="muted" className="mt-1 capitalize">{w}</Text>
                      </div>
                    ))}
                  </HStack>
                </div>

                <div>
                  <Text size="sm" weight="medium" color="muted" className="mb-3">Text Colors</Text>
                  <VStack gap="1">
                    {(['default', 'muted', 'subtle', 'primary', 'success', 'warning', 'danger'] as const).map((c) => (
                      <Text key={c} color={c}>
                        {c.charAt(0).toUpperCase() + c.slice(1)} — The quick brown fox jumps over the lazy dog
                      </Text>
                    ))}
                  </VStack>
                </div>

                <div>
                  <Text size="sm" weight="medium" color="muted" className="mb-3">Heading Component</Text>
                  <VStack gap="2">
                    <Heading level="h1">Heading 1 — Inter Bold</Heading>
                    <Heading level="h2">Heading 2 — Inter SemiBold</Heading>
                    <Heading level="h3">Heading 3 — Inter SemiBold</Heading>
                    <Heading level="h4">Heading 4 — Inter SemiBold</Heading>
                    <Heading level="h5">Heading 5 — Inter SemiBold</Heading>
                    <Heading level="h6">Heading 6 — Inter SemiBold</Heading>
                  </VStack>
                </div>

                <div>
                  <Text size="sm" weight="medium" color="muted" className="mb-3">Code</Text>
                  <VStack gap="3">
                    <Text>Use <Code>npm install</Code> to install dependencies.</Text>
                    <Code block>{`import { Button } from './design-system'\n\n<Button variant="primary" size="md">Click me</Button>`}</Code>
                  </VStack>
                </div>
              </VStack>
            </Section>

            {/* Spacing Scale */}
            <Section title="Foundation — Spacing">
              <Card variant="outlined" padding="lg">
                <VStack gap="3">
                  {spacingScale.map((s) => (
                    <div key={s.label} className="flex items-center gap-4">
                      <Text size="xs" color="muted" className="w-6 text-right font-mono shrink-0">{s.label}</Text>
                      <div className={`h-4 ${s.cls} bg-primary-400 rounded-sm shrink-0`} />
                      <Text size="xs" color="subtle" className="font-mono">{s.value}</Text>
                    </div>
                  ))}
                </VStack>
              </Card>
            </Section>

            {/* Shadows */}
            <Section title="Foundation — Elevation / Shadows">
              <HStack gap="6" wrap align="end">
                {shadowScale.map((s) => (
                  <div key={s.label} className="flex flex-col items-center gap-3">
                    <div className={`h-20 w-24 rounded-xl bg-white ${s.cls}`} />
                    <Text size="xs" weight="medium" color="muted">{s.label}</Text>
                    <Text size="xs" color="subtle" className="font-mono">{s.desc}</Text>
                  </div>
                ))}
              </HStack>
            </Section>

            {/* Border Radius */}
            <Section title="Foundation — Border Radius">
              <HStack gap="6" wrap align="end">
                {radiiScale.map((r) => (
                  <div key={r.label} className="flex flex-col items-center gap-3">
                    <div className={`h-16 w-16 bg-primary-100 border-2 border-primary-300 ${r.cls}`} />
                    <Text size="xs" weight="medium" color="muted">{r.label}</Text>
                    <Text size="xs" color="subtle" className="font-mono">{r.value}</Text>
                  </div>
                ))}
              </HStack>
            </Section>

            {/* Divider */}
            <Section title="Foundation — Divider">
              <VStack gap="6">
                <div>
                  <Text size="sm" weight="medium" color="muted" className="mb-3">Horizontal variants</Text>
                  <VStack gap="4">
                    <Divider variant="solid"  />
                    <Divider variant="dashed" />
                    <Divider variant="dotted" />
                  </VStack>
                </div>
                <div>
                  <Text size="sm" weight="medium" color="muted" className="mb-3">With label</Text>
                  <VStack gap="4">
                    <Divider label="OR" />
                    <Divider label="Continue with" />
                  </VStack>
                </div>
                <div>
                  <Text size="sm" weight="medium" color="muted" className="mb-3">Vertical</Text>
                  <HStack gap="4" className="h-12">
                    <Text>Left</Text>
                    <Divider orientation="vertical" />
                    <Text>Middle</Text>
                    <Divider orientation="vertical" />
                    <Text>Right</Text>
                  </HStack>
                </div>
              </VStack>
            </Section>

            {/* ── COMPONENTS ─────────────────────────────────────────────── */}

            {/* Buttons */}
            <Section title="Button">
              <VStack gap="4">
                <HStack gap="3" wrap>
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="danger">Danger</Button>
                  <Button variant="link">Link</Button>
                </HStack>
                <HStack gap="3" wrap>
                  <Button size="xs">XSmall</Button>
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                  <Button size="xl">XLarge</Button>
                </HStack>
                <HStack gap="3" wrap>
                  <Button loading>Loading</Button>
                  <Button disabled>Disabled</Button>
                  <Button
                    leftIcon={
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    }
                  >
                    With Icon
                  </Button>
                </HStack>
              </VStack>
            </Section>

            {/* Inputs */}
            <Section title="Input">
              <Grid cols={1} mdCols={2} gap="4">
                <Input label="Default input" placeholder="Enter text..." hint="Helpful hint text" />
                <Input label="With error" placeholder="Enter email..." error="Please enter a valid email" />
                <Input
                  label="With left icon"
                  placeholder="Search..."
                  leftElement={
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  }
                />
                <Input
                  label="Controlled"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="Type here..."
                  hint={inputVal ? `${inputVal.length} characters` : undefined}
                />
              </Grid>
            </Section>

            {/* Cards */}
            <Section title="Card">
              <Grid cols={1} mdCols={3} gap="4">
                <Card variant="elevated">
                  <CardHeader>
                    <CardTitle>Elevated Card</CardTitle>
                    <CardDescription>Default shadow style</CardDescription>
                  </CardHeader>
                  <CardContent><p className="text-sm text-gray-600">Card body content goes here.</p></CardContent>
                  <CardFooter><Button size="sm">Action</Button></CardFooter>
                </Card>
                <Card variant="outlined">
                  <CardHeader>
                    <CardTitle>Outlined Card</CardTitle>
                    <CardDescription>Border only style</CardDescription>
                  </CardHeader>
                  <CardContent><p className="text-sm text-gray-600">Card body content goes here.</p></CardContent>
                  <CardFooter><Button size="sm" variant="outline">Action</Button></CardFooter>
                </Card>
                <Card variant="filled">
                  <CardHeader>
                    <CardTitle>Filled Card</CardTitle>
                    <CardDescription>Subtle filled background</CardDescription>
                  </CardHeader>
                  <CardContent><p className="text-sm text-gray-600">Card body content goes here.</p></CardContent>
                  <CardFooter><Button size="sm" variant="ghost">Action</Button></CardFooter>
                </Card>
              </Grid>
            </Section>

            {/* Badges */}
            <Section title="Badge">
              <VStack gap="3">
                <HStack gap="2" wrap>
                  <Badge variant="default">Default</Badge>
                  <Badge variant="primary">Primary</Badge>
                  <Badge variant="success">Success</Badge>
                  <Badge variant="warning">Warning</Badge>
                  <Badge variant="danger">Danger</Badge>
                  <Badge variant="info">Info</Badge>
                  <Badge variant="outline">Outline</Badge>
                </HStack>
                <HStack gap="2" wrap>
                  <Badge variant="success" dot>Active</Badge>
                  <Badge variant="warning" dot>Pending</Badge>
                  <Badge variant="danger" dot>Offline</Badge>
                </HStack>
              </VStack>
            </Section>

            {/* Avatars */}
            <Section title="Avatar">
              <VStack gap="4">
                <HStack gap="3" align="center" wrap>
                  <Avatar name="John Doe" size="xs" />
                  <Avatar name="Jane Smith" size="sm" />
                  <Avatar name="Bob Johnson" size="md" />
                  <Avatar name="Alice Brown" size="lg" />
                  <Avatar name="Charlie Wilson" size="xl" />
                  <Avatar size="md" />
                </HStack>
                <AvatarGroup
                  avatars={[
                    { name: 'Alice A' },
                    { name: 'Bob B' },
                    { name: 'Carol C' },
                    { name: 'David D' },
                    { name: 'Eva E' },
                    { name: 'Frank F' },
                  ]}
                  max={4}
                />
              </VStack>
            </Section>

            {/* Spinner */}
            <Section title="Spinner">
              <HStack gap="6" align="center" wrap>
                <Spinner size="xs" />
                <Spinner size="sm" />
                <Spinner size="md" />
                <Spinner size="lg" />
                <Spinner size="xl" />
                <span className="bg-primary-600 rounded-lg p-3 inline-flex">
                  <Spinner color="white" size="md" />
                </span>
              </HStack>
            </Section>

            {/* Alert */}
            <Section title="Alert">
              <VStack gap="3">
                <Alert variant="info"    title="Information" onClose={() => {}}>Your profile has been updated successfully.</Alert>
                <Alert variant="success" title="Success"     onClose={() => {}}>Your changes have been saved.</Alert>
                <Alert variant="warning" title="Warning"     onClose={() => {}}>This action cannot be undone.</Alert>
                <Alert variant="danger"  title="Error"       onClose={() => {}}>Failed to connect to the server.</Alert>
                <Alert variant="neutral">A neutral message without a title or close button.</Alert>
              </VStack>
            </Section>

            {/* Modal */}
            <Section title="Modal">
              <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
              <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                title="Confirm Action"
                description="Are you sure you want to proceed?"
                footer={
                  <>
                    <Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
                    <Button variant="danger"  onClick={() => setModalOpen(false)}>Delete</Button>
                  </>
                }
              >
                <p className="text-sm text-gray-600">
                  This will permanently delete the selected item. This action cannot be undone.
                </p>
              </Modal>
            </Section>

            {/* Toast */}
            <Section title="Toast">
              <ToastDemo />
            </Section>

            {/* Tooltip */}
            <Section title="Tooltip">
              <HStack gap="6" wrap>
                <Tooltip content="Top tooltip" placement="top">
                  <Button variant="outline" size="sm">Top</Button>
                </Tooltip>
                <Tooltip content="Bottom tooltip" placement="bottom">
                  <Button variant="outline" size="sm">Bottom</Button>
                </Tooltip>
                <Tooltip content="Left tooltip" placement="left">
                  <Button variant="outline" size="sm">Left</Button>
                </Tooltip>
                <Tooltip content="Right tooltip" placement="right">
                  <Button variant="outline" size="sm">Right</Button>
                </Tooltip>
              </HStack>
            </Section>

            {/* Layout: Grid */}
            <Section title="Grid Layout">
              <Grid cols={1} smCols={2} lgCols={4} gap="4">
                {Array.from({ length: 8 }, (_, i) => (
                  <div key={i} className="h-16 rounded-lg bg-primary-100 border border-primary-200 flex items-center justify-center text-sm font-medium text-primary-700">
                    Cell {i + 1}
                  </div>
                ))}
              </Grid>
              <Grid cols={12} gap="4" className="mt-4">
                <GridItem colSpan={4}><div className="h-12 rounded-lg bg-success-50 border border-green-200 flex items-center justify-center text-xs text-green-700 font-medium">4 cols</div></GridItem>
                <GridItem colSpan={4}><div className="h-12 rounded-lg bg-warning-50 border border-yellow-200 flex items-center justify-center text-xs text-yellow-700 font-medium">4 cols</div></GridItem>
                <GridItem colSpan={4}><div className="h-12 rounded-lg bg-danger-50 border border-red-200 flex items-center justify-center text-xs text-red-700 font-medium">4 cols</div></GridItem>
              </Grid>
            </Section>

          </VStack>
        </Container>
      </div>
    </ToastProvider>
  )
}
