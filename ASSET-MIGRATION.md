# Asset Migration Inventory

## Purpose

The live project keeps large visual and publication assets outside the source tree under the root-relative `/manus-storage/` namespace. The accompanying **complete export package** includes a directory of the same name containing all currently referenced assets, so the website can be migrated to a new host without broken fonts, figures, or publication links.

## Bundle contents

| Asset category | Count | Destination in the export package |
|---|---:|---|
| Chakra Petch font files | 9 | `manus-storage/ChakraPetch-*.ttf` |
| Via Negativa figures, light and dark variants | 42 | `manus-storage/IMG_*.png` |
| Via Negativa publication PDF | 1 | `manus-storage/ViaNegativaarXivv3_58458eb4.pdf` |
| Compute 2030 publication PDFs | 2 | `manus-storage/compute2030_*.pdf` |
| **Total referenced files** | **54** | `manus-storage/` |

## Migration procedure

Copy the export package's `manus-storage/` directory to `client/public/manus-storage/` in the receiving project **before** running the production build. The source code already uses root-relative paths such as `/manus-storage/IMG_9248_7900ab5d.png`; no component-level source changes are required once the files are placed in that location.

```text
the-ashby-institute/
└── client/
    └── public/
        └── manus-storage/
            ├── ChakraPetch-Regular_fc7efd29.ttf
            ├── IMG_9248_7900ab5d.png
            ├── IMG_9248_dark_261639b4.png
            ├── ViaNegativaarXivv3_58458eb4.pdf
            └── …
```

> The source repository intentionally excludes the asset directory from normal commits, because the current deployment workflow serves these files from managed static storage. The complete export ZIP is the archival handoff that includes both source and assets.

## Verification

After copying the asset directory and running `pnpm build`, verify that the Via Negativa reading edition loads both light and dark figure variants, the site uses Chakra Petch headings, and the following files return HTTP 200 from the final host:

| URL path | Expected role |
|---|---|
| `/manus-storage/ChakraPetch-Regular_fc7efd29.ttf` | Primary display font. |
| `/manus-storage/IMG_9248_7900ab5d.png` | Via Negativa elasticity-gap figure. |
| `/manus-storage/IMG_9248_dark_261639b4.png` | Dark-mode figure variant. |
| `/manus-storage/ViaNegativaarXivv3_58458eb4.pdf` | Via Negativa PDF. |
| `/manus-storage/compute2030_report_v1_ec1b767c_ce150801.pdf` | Compute 2030 report. |
