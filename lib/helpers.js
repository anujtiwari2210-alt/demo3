import { createElement } from "react";
import {
  Star, Flower2, Lightbulb, Castle, Landmark, Award, Gem, PartyPopper, Cake,
  Drama, DraftingCompass, MessagesSquare, Palette, MessageCircle, MapPin,
  BadgeCheck, Clock, Building2, Compass, Mail, Phone, Sparkles,
} from "lucide-react";
import constants from "@/data/constants.json";

/** Builds a wa.me link with a pre-filled message */
export const waLink = (message = constants.whatsappMessages.default) =>
  `https://wa.me/${constants.contact.whatsapp}?text=${encodeURIComponent(message)}`;

/** JSON me icon ka naam likho (e.g. "flower"), yahan se component mil jata hai */
const ICONS = {
  star: Star, flower: Flower2, light: Lightbulb, castle: Castle, temple: Landmark,
  award: Award, gem: Gem, party: PartyPopper, cake: Cake, curtains: Drama,
  architecture: DraftingCompass, forum: MessagesSquare, palette: Palette,
  chat: MessageCircle, pin: MapPin, verified: BadgeCheck, clock: Clock,
  building: Building2, compass: Compass, mail: Mail, phone: Phone,
};

export function Icon({ name, ...props }) {
  return createElement(ICONS[name] || Sparkles, props);
}
