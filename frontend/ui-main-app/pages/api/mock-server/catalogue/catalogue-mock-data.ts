export interface CategoryResponse {
    uid: string;
    name: string;
    code: string;
    parentPath: string;
}

export const AllCategories: Array<CategoryResponse> = [
    {
        uid: "a9c5542d-0a02-40b8-bff6-678df4243860",
        name: "Beam characterization",
        code: "beam-characterization",
        parentPath: ""
    },
    {
        uid: "636b41a9-d4f5-4cba-9dd5-0ada092cc804",
        name: "Cameras",
        code: "cameras",
        parentPath: "beam-characterization"
    },
    {
        uid: "4f7c9c9f-b32c-4387-af59-82452cc70289",
        name: "Wavefront sensors",
        code: "wavefront-sensors",
        parentPath: "beam-characterization"
    },
    {
        uid: "af2cb008-0149-4f9a-b2d1-4befb4fec8ef",
        name: "Energy meters",
        code: "energy-meters",
        parentPath: "beam-characterization"
    },
    {
        uid: "80a9f0c7-1f46-4d96-a94c-c1d8825eff4b",
        name: "Vacuum technology",
        code: "vacuum-technology",
        parentPath: ""
    },
    {
        uid: "8b76b1bb-654f-4ec9-956d-be9f3d28cd0a",
        name: "Vacuum pumps",
        code: "vacuum-pumps",
        parentPath: "vacuum-technology"
    },
    {
        uid: "f70dd82e-04d8-4a30-894a-2bee30c44276",
        name: "Turbomolecular pumps",
        code: "Turbomolecular pumps",
        parentPath: "vacuum-technology/vacuum-pumps"
    },
    {
        uid: "55222585-a06f-4cc1-a947-9aae6d24d8ee",
        name: "Dry vacuum pumps",
        code: "Dry vacuum pumps",
        parentPath: "vacuum-technology/vacuum-pumps"
    },
    {
        uid: "f1ef0da8-6c10-4acc-968c-eaa536e315e7",
        name: "Cryopumps",
        code: "Cryopumps",
        parentPath: "vacuum-technology/vacuum-pumps"
    },
    {
        uid: "7722c01e-7797-4b23-95b7-8808c28e484f",
        name: "Motion",
        code: "motion",
        parentPath: ""
    },
    {
        uid: "e88a35a4-83b4-41f9-89e3-83ad5649ab5d",
        name: "Actuators",
        code: "actuators",
        parentPath: "motion"
    },
    {
        uid: "dfb5f306-2dde-4342-a419-f2a8975e5790",
        name: "Motorized actuators",
        code: "motorized-actuators",
        parentPath: "motion/actuators"
    }
]
