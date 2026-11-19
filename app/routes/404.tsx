import { createFileRoute } from '@tanstack/react-router'
import { NotFound } from './__root'

export const Route = createFileRoute('/404')({ component: NotFound })
