/**
 * banner-data.js
 * Seleção curada para o banner de lançamento — puxa direto dos
 * arrays reais (companies, jobs, profiles), sem duplicar dado.
 */

import { companies } from "./good-companies.js";
import { jobs } from "./jobs.js";
import { profiles } from "./perfis-dev.js";

export const launchBanner = [
    {
        ...jobs.find((j) => j.title === "Geekhunter"),
        badgeLabel: "Oportunidade",
    },
    {
        ...companies.find((c) => c.title === "rocketseat"),
        badgeLabel: "Empresa",
    },
    {
        ...profiles.find((p) => p.title === "Filipe Deschamps"),
        badgeLabel: "Dev",
    },
];