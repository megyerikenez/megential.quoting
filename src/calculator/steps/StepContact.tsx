import { useRef, useState, type FormEvent } from 'react'
import consultImage from '../../assets/photos/lead-consult.jpg'
import { Button } from '../../components/Button'
import { ArrowRightIcon } from '../../components/icons'
import { validateContact, type ContactField } from '../../lib/validation'
import { useCalculator } from '../useCalculator'
import { OptionRow } from '../components/OptionRow'

type Errors = Partial<Record<ContactField, string>>

export function StepContact() {
  const { state, dispatch, submitLead } = useCalculator()
  const { contact } = state
  const [errors, setErrors] = useState<Errors>({})
  const formRef = useRef<HTMLFormElement>(null)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validateContact(contact)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      const first = (Object.keys(nextErrors) as ContactField[])[0]
      formRef.current?.querySelector<HTMLElement>(`[data-field="${first}"]`)?.focus()
      return
    }
    submitLead()
  }

  return (
    <div>
      <div className="border border-line bg-cream px-5 py-4">
        <p className="text-[13px] leading-relaxed text-ink-soft">
          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink">
            Portfólió demó
          </span>
          <br />
          A megadott adatok nem kerülnek elküldésre — kizárólag ebben a böngészőben
          maradnak, a demó bemutatásához.
        </p>
      </div>

      <figure className="mt-6 hidden lg:block">
        <img
          src={consultImage}
          alt="Szakemberek közösen nézik át a felújítási terveket"
          width={1200}
          height={800}
          loading="lazy"
          className="aspect-[3/2] w-full border border-line object-cover"
        />
        <figcaption className="dimline mt-3">
          Minden ajánlatkérés után személyes egyeztetés következik
        </figcaption>
      </figure>

      <form ref={formRef} id="contact-form" className="mt-8 flex flex-col gap-7" onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="contact-name" className="field-label">
            Teljes név
          </label>
          <input
            id="contact-name"
            data-field="name"
            type="text"
            autoComplete="name"
            value={contact.name}
            onChange={(e) => dispatch({ type: 'setContact', field: 'name', value: e.target.value })}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? 'contact-name-error' : undefined}
            className="field-input"
            placeholder="Pl. Kovács Anna"
          />
          {errors.name && (
            <p id="contact-name-error" className="field-error">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-email" className="field-label">
            E-mail-cím
          </label>
          <input
            id="contact-email"
            data-field="email"
            type="email"
            autoComplete="email"
            value={contact.email}
            onChange={(e) => dispatch({ type: 'setContact', field: 'email', value: e.target.value })}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? 'contact-email-error' : undefined}
            className="field-input"
            placeholder="Pl. anna.kovacs@pelda.hu"
          />
          {errors.email && (
            <p id="contact-email-error" className="field-error">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-phone" className="field-label">
            Telefonszám
          </label>
          <input
            id="contact-phone"
            data-field="phone"
            type="tel"
            autoComplete="tel"
            value={contact.phone}
            onChange={(e) => dispatch({ type: 'setContact', field: 'phone', value: e.target.value })}
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
            className="field-input"
            placeholder="Pl. +36 30 123 4567"
          />
          {errors.phone && (
            <p id="contact-phone-error" className="field-error">
              {errors.phone}
            </p>
          )}
        </div>

        <fieldset>
          <legend className="field-label !mb-3">Hogyan kereshetünk?</legend>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <OptionRow
              name="contact-preference"
              code="A"
              title="Telefonon"
              selected={contact.preference === 'phone'}
              onSelect={() => dispatch({ type: 'setContact', field: 'preference', value: 'phone' })}
            />
            <OptionRow
              name="contact-preference"
              code="B"
              title="E-mailben"
              selected={contact.preference === 'email'}
              onSelect={() => dispatch({ type: 'setContact', field: 'preference', value: 'email' })}
            />
          </div>
        </fieldset>

        <div>
          <label htmlFor="contact-message" className="field-label">
            Megjegyzés <span className="font-normal text-ink-faint">(nem kötelező)</span>
          </label>
          <textarea
            id="contact-message"
            data-field="message"
            rows={4}
            value={contact.message}
            onChange={(e) => dispatch({ type: 'setContact', field: 'message', value: e.target.value })}
            className="field-input !h-auto resize-y py-3"
            placeholder="Pl. egyéb munkálatok, határidők, kérdések"
          />
        </div>

        <div className="hidden lg:block">
          <Button type="submit" variant="accent" size="lg" className="w-full sm:w-auto">
            Ajánlatkérés beküldése
            <ArrowRightIcon />
          </Button>
        </div>
      </form>
    </div>
  )
}
