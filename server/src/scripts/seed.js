import mongoose from 'mongoose';
import axios from 'axios';
import { config } from '../config/config.js';
import connectToDb from '../config/database.js';
import userModel from '../models/user.model.js';
import productModel from '../models/product.model.js';
import categoryModel from '../models/category.model.js';
import { uploadFileToImageKit } from '../services/storage.service.js';

// Scraped Sciolto Products Data
const productsData = {
    shirts: [
        {
            title: 'Sciolto Men Smart Slim Fit Textured Casual Shirt',
            price: 999,
            description:
                'Blue textured casual shirt, has a spread collar, button placket, long regular sleeves, curved hem',
            images: [
                'https://assets.myntassets.com/assets/images/2024/NOVEMBER/9/DRXjx0X4_e9ed51d23bdf43899c1e4077d7055c5b.jpg',
                'https://assets.myntassets.com/assets/images/2024/NOVEMBER/9/Mjs1fRjx_c97d6b6c70f24b59a9fdecbd76c17831.jpg',
                'https://assets.myntassets.com/assets/images/2024/NOVEMBER/9/8QqNfQiz_1038a66a6d0b4c2db51a417eda6135b2.jpg',
            ],
            sizes: ['38', '40', '42', '44', '46'],
        },
        {
            title: 'Sciolto Men Smart Spread Collar Solid Casual Shirt',
            price: 999,
            description:
                'Navy blue opaque casual shirt. Spread collar, button placket, long sleeves, curved hemline',
            images: [
                'https://assets.myntassets.com/assets/images/2024/OCTOBER/28/qk6vHcc3_a1705398c31247269ba5b7a922c2069e.jpg',
                'https://assets.myntassets.com/assets/images/2024/OCTOBER/28/blI7nzbk_62509c561b794243b75eb553d95a79e5.jpg',
                'https://assets.myntassets.com/assets/images/2024/OCTOBER/28/V6KBWIpb_4ca2ea8095124196b34a74821c21f749.jpg',
            ],
            sizes: ['38', '40', '42', '44', '46'],
        },
        {
            title: 'Sciolto Mauve & White Striped Classic Slim Fit Opaque Casual Shirt',
            price: 1127,
            description:
                'Mauve & white vertical stripes striped opaque Casual shirt, has a spread collar, button placket, long regular sleeves, high-low hem',
            images: [
                'https://assets.myntassets.com/assets/images/29592680/2024/5/16/f7da711d-a19c-4fde-97fa-161458e28c081715857899598SnitchMenClassicSlimFitOpaqueStripedCasualShirt1.jpg',
                'https://assets.myntassets.com/assets/images/29592680/2024/5/16/0e02f06f-8c25-4bf4-9aca-c9d77506b22b1715857899696SnitchMenClassicSlimFitOpaqueStripedCasualShirt2.jpg',
                'https://assets.myntassets.com/assets/images/29592680/2024/5/16/6e0476df-9680-4ba8-932c-729a220a5e441715857899721SnitchMenClassicSlimFitOpaqueStripedCasualShirt3.jpg',
            ],
            sizes: ['38', '40', '42', '44', '46'],
        },
        {
            title: 'Sciolto Blue Classic Slim Fit Vertical Stripes Button-Down Collar Casual Shirt',
            price: 1127,
            description:
                'Blue vertical stripes opaque Casual shirt, has a button-down collar, button placket, no pocket, long regular sleeves, curved hem',
            images: [
                'https://assets.myntassets.com/assets/images/29592610/2024/5/16/906b1de7-5db0-492b-8c7c-86cd94f9999f1715857859297SnitchMenClassicSlimFitOpaqueStripedCasualShirt1.jpg',
                'https://assets.myntassets.com/assets/images/29592610/2024/5/16/3eaaf97d-66bb-482a-ab96-e4de1ed7a32d1715857859395SnitchMenClassicSlimFitOpaqueStripedCasualShirt2.jpg',
                'https://assets.myntassets.com/assets/images/29592610/2024/5/16/c65198a2-d10c-405f-a1f8-1cc4087b3ee11715857859420SnitchMenClassicSlimFitOpaqueStripedCasualShirt3.jpg',
            ],
            sizes: ['38', '40', '42', '44', '46'],
        },
        {
            title: 'Sciolto White Classic Slim Fit Vertical Striped Cotton Casual Shirt',
            price: 999,
            description:
                'White vertical striped casual shirt, has a button-down collar, button placket, long regular sleeves, curved hem',
            images: [
                'https://assets.myntassets.com/assets/images/24108006/2023/11/30/7053b6de-4ab4-42bf-82dd-f9df3381f42e1701343016769SnitchMenWhiteClassicSlimFitOpaqueStripedCasualShirt1.jpg',
                'https://assets.myntassets.com/assets/images/24108006/2023/11/30/b7ff18f2-424e-437c-b632-f6750e71fff31701343016779SnitchMenWhiteClassicSlimFitOpaqueStripedCasualShirt2.jpg',
                'https://assets.myntassets.com/assets/images/24108006/2023/11/30/af2cc265-9a98-4dd7-b6d6-2f9e4d0df24a1701343016787SnitchMenWhiteClassicSlimFitOpaqueStripedCasualShirt3.jpg',
            ],
            sizes: ['38', '40', '42', '44', '46'],
        },
        {
            title: 'Sciolto Slim Fit Spread Collar Short Sleeves Casual Shirt',
            price: 1129,
            description:
                'Black solid opaque Casual shirt, has a Spread Collar, button placket, pocket, short regular sleeves, curved hem',
            images: [
                'https://assets.myntassets.com/assets/images/29592796/2024/5/17/96186df7-ab20-4b75-8892-013d89f7a2c91715924971321SnitchMenStraightSlimFitOpaqueCasualShirt1.jpg',
                'https://assets.myntassets.com/assets/images/29592796/2024/5/17/3cb29305-9f65-4429-bc62-f6aa2dc946e01715924971347SnitchMenStraightSlimFitOpaqueCasualShirt2.jpg',
                'https://assets.myntassets.com/assets/images/29592796/2024/5/17/f0f4d3c5-590c-469b-987b-c8c87800b7e61715924971330SnitchMenStraightSlimFitOpaqueCasualShirt3.jpg',
            ],
            sizes: ['36', '40', '42', '44', '46'],
        },
        {
            title: 'Sciolto Men Casual Shirt',
            price: 1099,
            description:
                'Black Solid Opaque Casual shirts, has a Spread Collar, Button Placket, 1 Patch pocket, Long Regular Sleeves, Curved hem',
            images: [
                'https://assets.myntassets.com/assets/images/2026/JUNE/1/n1JLDMxu_a123d2adccea45b1a21cba5f02c30fe2.jpg',
                'https://assets.myntassets.com/assets/images/2026/JUNE/1/qADDCGVK_2ec07085b6b54493a08c0502d909c124.jpg',
                'https://assets.myntassets.com/assets/images/2026/JUNE/1/WXrXN6Im_373aeff41316460aa0b6bb45970e6d95.jpg',
            ],
            sizes: ['36', '38', '40', '42', '44', '46'],
        },
        {
            title: 'Sciolto Men Striped Casual Shirt',
            price: 1399,
            description:
                'Blue Vertical Stripes Striped Opaque Casual shirts, has a Spread Collar, Button Placket, 1 Patch pocket, Long Regular Sleeves, Curved hem',
            images: [
                'https://assets.myntassets.com/assets/images/2026/MAY/11/5MmkhANq_fd6de37f757e48aeaea9fa0e03064420.jpg',
                'https://assets.myntassets.com/assets/images/2026/MAY/11/RlJsoUg6_2224448361564e4297a54724be7efb8b.jpg',
                'https://assets.myntassets.com/assets/images/2026/MAY/11/FADXyPFA_fc28fba1c4c74e9ba5dccee57ee432e5.jpg',
            ],
            sizes: ['36', '38', '40', '42', '44', '46'],
        },
        {
            title: 'Sciolto Men Classic Button-Down Collar Solid Cotton Casual Shirt',
            price: 743,
            description:
                'Beige opaque casual shirt. Button-down collar, button placket, long sleeves, curved hemline',
            images: [
                'https://assets.myntassets.com/assets/images/2024/NOVEMBER/27/k2D36ozh_b5c2b5d243a94e9caba9725d6e18f242.jpg',
                'https://assets.myntassets.com/assets/images/2024/NOVEMBER/27/GRHZ5xwA_bda8400a0cb4413da250f2c3e275e691.jpg',
                'https://assets.myntassets.com/assets/images/2024/NOVEMBER/27/SmFuAEuv_c7fc45c47c2847aca58c0cf43ab90b8e.jpg',
            ],
            sizes: ['37', '39', '41', '43', '45', '48'],
        },
    ],
    tshirts: [
        {
            title: 'Sciolto Embroidery Polo Neck Cotton Oversized T-shirt',
            price: 1176,
            description:
                'Off White Oversized T-shirt for Men with subtle chest embroidery, polo collar, and drop shoulder sleeves.',
            images: [
                'https://assets.myntassets.com/assets/images/2026/APRIL/20/1h5GnqgV_2252131e03234a2f92298cde11eee736.jpg',
                'https://assets.myntassets.com/assets/images/2026/APRIL/20/BLyBKJwr_41af385643ed431a86333a6874428cb0.jpg',
                'https://assets.myntassets.com/assets/images/2026/APRIL/20/e0gShgFJ_b376628a2a4f42c1aca0857b5932560e.jpg',
            ],
            sizes: ['XS', 'S', 'M', 'L', 'XL'],
        },
        {
            title: 'Sciolto Men Typography Printed Polo Collar Applique T-shirt',
            price: 1499,
            description:
                'Black Polo T-shirt for Men, featuring a printed typography back graphic, long regular sleeves, and a premium collar.',
            images: [
                'https://assets.myntassets.com/assets/images/2026/JUNE/2/btyExXsz_17b30e965ccf4b9a86c0ff44a0f89ff4.jpg',
                'https://assets.myntassets.com/assets/images/2026/JUNE/2/Uhq2BSn6_b45491f529b84987afe98caebfe4c9cc.jpg',
                'https://assets.myntassets.com/assets/images/2026/JUNE/2/XyWAtVPY_cf882d3ed8a44e0a82ff1516357264f9.jpg',
            ],
            sizes: ['S', 'M', 'L', 'XL'],
        },
        {
            title: 'Sciolto Olive Self Design Polo Collar Casual T-shirt',
            price: 599,
            description:
                'Olive green zip polo collar t-shirt with self design texture, short sleeves, and relaxed casual styling.',
            images: [
                'https://assets.myntassets.com/assets/images/28214004/2024/3/12/1aba86e4-15e4-45e3-b0e6-6b3971ea430e1710254656113SnitchMenPoloCollarExtendedSleevesPocketsT-shirt1.jpg',
                'https://assets.myntassets.com/assets/images/28214004/2024/3/12/d1fb4c75-3080-4302-a5e6-48228a1a9d891710254656137SnitchMenPoloCollarExtendedSleevesPocketsT-shirt2.jpg',
                'https://assets.myntassets.com/assets/images/28214004/2024/3/12/604318c8-efec-4da7-a02e-a4e74a66af0a1710254656160SnitchMenPoloCollarExtendedSleevesPocketsT-shirt3.jpg',
            ],
            sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        },
        {
            title: 'Sciolto Oversized Polo Collar Drop-Shoulder Sleeves Pure Cotton T-Shirt',
            price: 738,
            description:
                'White and brown structured t-shirt for men, solid pattern, regular length, polo collar, short drop-shoulder sleeves.',
            images: [
                'https://assets.myntassets.com/assets/images/2025/SEPTEMBER/23/aOcoPL9G_50ac2533937246e98009984d4f803335.jpg',
                'https://assets.myntassets.com/assets/images/2025/SEPTEMBER/23/yht3pY20_84baef8365f34b7bbb03d995cebdff73.jpg',
                'https://assets.myntassets.com/assets/images/2025/SEPTEMBER/23/0guIz1iP_1615204594934e299417297fd0426997.jpg',
            ],
            sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        },
        {
            title: 'Sciolto Black Textured Polo Collar Slim Fit Cotton T-shirt',
            price: 828,
            description:
                'Black and white textured daily tee, slim fit cotton fabric, polo collar, short sleeves, comfortable build.',
            images: [
                'https://assets.myntassets.com/assets/images/2025/MAY/8/hKrOqNOa_4375915d66c349268f06d3f9820f22a4.jpg',
                'https://assets.myntassets.com/assets/images/2025/MAY/8/MoKM6EPd_b8108a3f20164d2797d08fe629a3a5b2.jpg',
                'https://assets.myntassets.com/assets/images/2025/MAY/8/u7L5RpDG_de31897ff7554a2189f2f308cbece5d0.jpg',
            ],
            sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        },
        {
            title: 'Sciolto Men Solid Polo Collar Slim Fit T-shirt',
            price: 1129,
            description:
                'Magenta solid casual tshirt, slim fit knit fabric with a front zip accent, short regular sleeves.',
            images: [
                'https://assets.myntassets.com/assets/images/29990559/2024/6/18/a0ec834d-4409-45de-b84b-840f9eb04fae1718723218511SnitchMenV-NeckSlimFitT-shirt1.jpg',
                'https://assets.myntassets.com/assets/images/29990559/2024/6/18/f86e76c0-edb4-405c-a8e1-e08292be4cbd1718723218487SnitchMenV-NeckSlimFitT-shirt2.jpg',
                'https://assets.myntassets.com/assets/images/29990559/2024/6/18/72e63cb3-22b3-45bb-9683-436c58ceffc41718723218462SnitchMenV-NeckSlimFitT-shirt3.jpg',
            ],
            sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        },
        {
            title: 'Sciolto Men Solid Round Neck Pure Cotton Relaxed Fit T-shirt',
            price: 665,
            description:
                'Purple soft crewneck t-shirt for men, solid shade, regular length, drop-shoulder short sleeves, knitted pure cotton.',
            images: [
                'https://assets.myntassets.com/assets/images/2025/OCTOBER/14/PyDMPAQ8_7e4348a80fa84c5797d8e8cb947a6d8c.jpg',
                'https://assets.myntassets.com/assets/images/2025/OCTOBER/14/uXVQ1iey_e2d1d6f0d1db4d7391f3e6b5ba56d36c.jpg',
                'https://assets.myntassets.com/assets/images/2025/OCTOBER/14/9e8NXgDl_ffa8e36619f548da8ca84852a01573fa.jpg',
            ],
            sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        },
        {
            title: 'Sciolto Textured Polo Collar Drop-Shoulder Sleeves Pure Cotton T-Shirt',
            price: 1299,
            description:
                'Textured weave white and brown t-shirt, relaxed drop-shoulder sleeves, polo neck collar, pure premium cotton.',
            images: [
                'https://assets.myntassets.com/assets/images/2025/JULY/31/WhVlDypG_99418ebb9ab4476094d8ab2333862b8c.jpg',
                'https://assets.myntassets.com/assets/images/2025/JULY/31/HrLy2r3d_e9b231aa6ecd47eeab1137f03c915674.jpg',
                'https://assets.myntassets.com/assets/images/2025/JULY/31/VKGS7atK_4f977ca4551c45cda7f9a3374faebb84.jpg',
            ],
            sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        },
        {
            title: 'Sciolto Men Printed Drop-Shoulder Sleeves T-shirt',
            price: 682,
            description:
                'Beige crewneck tshirt for men featuring graphic chest and back prints, drop-shoulder short sleeves, premium knit.',
            images: [
                'https://assets.myntassets.com/assets/images/2025/NOVEMBER/11/Kg5s1KN5_653c7d277fde467c914d20bd21b9b6fb.jpg',
                'https://assets.myntassets.com/assets/images/2025/NOVEMBER/11/4YRPccQm_b40f7491437d4ecf98033bb67ed4002a.jpg',
                'https://assets.myntassets.com/assets/images/2025/NOVEMBER/11/cXAJ8CxU_32074f56877848be84fc43c0cf4aca63.jpg',
            ],
            sizes: ['S', 'M', 'L', 'XL'],
        },
    ],
    jeans: [
        {
            title: 'Sciolto Men Flared Mid-Rise Low Distress Light Fade Jeans',
            price: 1499,
            description:
                'Medium shade blue denim, low distress details, flared leg opening, mid-rise waist, vintage stonewashed style.',
            images: [
                'https://assets.myntassets.com/assets/images/2026/MAY/18/rNttCs9W_31ebd60a1d304d07b78894d9b30f53ec.jpg',
                'https://assets.myntassets.com/assets/images/2026/MAY/18/LWy4paIy_f74918095ff44ad98598c3592e5eb4c3.jpg',
                'https://assets.myntassets.com/assets/images/2026/MAY/18/YhOuX6Tz_2dff8084f2434ac9a8beac5f1fcc34af.jpg',
            ],
            sizes: ['28', '30', '32', '34', '36', '38'],
        },
        {
            title: 'Sciolto Men Straight Fit Mid-Rise Light Fade Jeans',
            price: 1899,
            description:
                'Dark shade charcoal black jeans, straight fit leg, clean look mid-rise waist, durable non-stretch denim, vintage wash.',
            images: [
                'https://assets.myntassets.com/assets/images/2026/MARCH/16/phd76wEe_1e0b6e4889954fde905050a1b1735fed.jpg',
                'https://assets.myntassets.com/assets/images/2026/MARCH/16/T8pDh51E_def5c59515af4de79e971032940d1760.jpg',
                'https://assets.myntassets.com/assets/images/2026/MARCH/16/7GL7qIQU_09129c6fe3f34e339106dc97ae8197a8.jpg',
            ],
            sizes: ['28', '30', '32', '34', '36', '38'],
        },
        {
            title: 'Sciolto Men Straight Fit Mid-Rise Stretchable Jeans',
            price: 1331,
            description:
                'Solid jet black straight-leg jeans, comfortable mid-rise stretch denim, 5 pockets configuration, regular length.',
            images: [
                'https://assets.myntassets.com/assets/images/2026/APRIL/6/o1pE2ijG_887b3f27eeb94a7c9c1df9b7b2e446df.jpg',
                'https://assets.myntassets.com/assets/images/2026/APRIL/6/TT3e1Eqj_24969c27bdf14ab3898765207d720d57.jpg',
                'https://assets.myntassets.com/assets/images/2026/APRIL/6/zfF3dVAE_68ae8ae397824d5481ffe71680e5145d.jpg',
            ],
            sizes: ['28', '30', '32', '34', '36', '38'],
        },
        {
            title: 'Sciolto Men Grey Mid-Rise Clean Look Pure Cotton Jeans',
            price: 1151,
            description:
                'Coloured wash solid grey jeans, baggy wide-leg fit, mid-rise waist, 100% rigid cotton denim, clean layout.',
            images: [
                'https://assets.myntassets.com/assets/images/29840296/2024/5/29/1d57dffa-7577-4c89-8c15-e80867fd39b81716964883418SnitchMenJeanRelaxedFitLowDistressStretchableJeans1.jpg',
                'https://assets.myntassets.com/assets/images/29840296/2024/5/29/32bc2649-a588-4e38-89cb-a099b93dd3b31716964883499SnitchMenJeanRelaxedFitLowDistressStretchableJeans2.jpg',
                'https://assets.myntassets.com/assets/images/29840296/2024/5/29/78679c17-4f0f-4c8a-94a3-802620b323751716964883523SnitchMenJeanRelaxedFitLowDistressStretchableJeans3.jpg',
            ],
            sizes: ['30', '32', '34', '36', '38'],
        },
        {
            title: 'Sciolto Men Straight Fit Mid-Rise Light Fade Jeans',
            price: 1899,
            description:
                'Classic blue straight fit denim, vintage washed texture, mid-rise, cropped ankle length, non-stretch premium cotton.',
            images: [
                'https://assets.myntassets.com/assets/images/2026/APRIL/29/OaDPx08v_02776b83b6614002a6069b106e4c9a53.jpg',
                'https://assets.myntassets.com/assets/images/2026/APRIL/29/VX67BNrL_9261297bd49a4e6fa705c3fe7ead4fce.jpg',
                'https://assets.myntassets.com/assets/images/2026/APRIL/29/w1Nq7Jwy_f35d106633e34232b602904f4a31fcf5.jpg',
            ],
            sizes: ['28', '30', '32', '34', '36', '38'],
        },
        {
            title: 'Sciolto Men Mid-Rise Low Distress Light Fade Jeans',
            price: 1899,
            description:
                'Charcoal black baggy jeans, low distress details with a front seam design, 5 pockets layout, regular length.',
            images: [
                'https://assets.myntassets.com/assets/images/2026/APRIL/6/lih1C4lG_76c3b4b2098a49bf821833ad11a11111.jpg',
                'https://assets.myntassets.com/assets/images/2026/APRIL/6/p8pdf7SH_e29482261db5452eac1049ac3e470ee9.jpg',
                'https://assets.myntassets.com/assets/images/2026/APRIL/6/V9kLcACH_933f3010b33040b68fcf81ef29300f4d.jpg',
            ],
            sizes: ['28', '30', '32', '34', '36', '38'],
        },
        {
            title: 'Sciolto Men Straight Fit Mid-Rise Light Fade Jeans',
            price: 1354,
            description:
                'Medium grey wash straight-leg jeans, clean look daily wear denim, non-stretch cotton material, regular length.',
            images: [
                'https://assets.myntassets.com/assets/images/2026/MARCH/23/sQEZbTor_cafd20b56a934f28842f34357810d41b.jpg',
                'https://assets.myntassets.com/assets/images/2026/MARCH/23/1qp5TlUZ_fb9950748bb74a6a863767822e124276.jpg',
                'https://assets.myntassets.com/assets/images/2026/MARCH/23/EZJWGW5W_c7abf3e4c7604ea5ae928223bca7e30e.jpg',
            ],
            sizes: ['28', '30', '32', '34', '36', '38'],
        },
        {
            title: 'Sciolto Men Mid-rise Pure Cotton Baggy Jeans',
            price: 1393,
            description:
                'Stonewashed black baggy jeans, mildly distressed street styling, front seam accents, rigid cotton denim.',
            images: [
                'https://assets.myntassets.com/assets/images/2026/MARCH/12/CBDa0Okd_61f8dd8dfd9042c68075bf4f547a6665.jpg',
                'https://assets.myntassets.com/assets/images/2026/MARCH/12/WwqJIjFs_46c9b6b9b5cf4ed1bb95940ac2478432.jpg',
                'https://assets.myntassets.com/assets/images/2026/MARCH/12/pO6uxVXf_64ef11f812f64b79bc204ce0b3a99ce6.jpg',
            ],
            sizes: ['28', '30', '32', '34', '36', '38'],
        },
        {
            title: 'Sciolto Men Blue Baggy Fit Pure Cotton Jeans',
            price: 1121,
            description:
                'Classic blue utility cargo jeans, baggy relaxed wide leg, mid-rise, 6 pockets layout, zip and button fly.',
            images: [
                'https://assets.myntassets.com/assets/images/23356466/2023/5/23/eda1103d-2ca5-4cc2-a1be-2578eb39f1101684841743558SnitchMenBlueWideLegLowDistressStretchableJeans1.jpg',
                'https://assets.myntassets.com/assets/images/23356466/2023/5/23/67f02926-5d81-41c1-840f-a78eb37f5c111684841743587SnitchMenBlueWideLegLowDistressStretchableJeans2.jpg',
                'https://assets.myntassets.com/assets/images/23356466/2023/5/23/28bcbcf7-202f-4dc9-9f87-033f0231b0e21684841743572SnitchMenBlueWideLegLowDistressStretchableJeans3.jpg',
            ],
            sizes: ['30', '32', '34', '36'],
        },
    ],
};

async function downloadImage(url) {
    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        return Buffer.from(response.data);
    } catch (error) {
        console.error(`Failed to download image from ${url}:`, error.message);
        throw error;
    }
}

async function seedCategory(
    productsList,
    sellerId,
    categoryDoc,
    attributeName,
) {
    const categoryId = categoryDoc._id;
    const categoryName = categoryDoc.name;
    console.log(
        `\n--- Seeding category [${categoryName}] for Seller: ${sellerId} ---`,
    );

    for (let i = 0; i < productsList.length; i++) {
        const item = productsList[i];
        console.log(
            `\n(${i + 1}/${productsList.length}) Product: "${item.title}"`,
        );

        try {
            const uploadedImages = [];
            for (let j = 0; j < item.images.length; j++) {
                const imageUrl = item.images[j];
                console.log(
                    `   Downloading image ${j + 1}/${item.images.length}...`,
                );
                const buffer = await downloadImage(imageUrl);

                console.log(
                    `   Uploading image ${j + 1}/${item.images.length} to ImageKit...`,
                );
                const uploadResult = await uploadFileToImageKit({
                    buffer,
                    fileName: `${categoryName}-${i}-${j}.jpg`,
                    folder: `products/${sellerId}`,
                });

                uploadedImages.push({
                    url: uploadResult.url,
                    thumbnailUrl: uploadResult.thumbnailUrl,
                    alt: `${item.title} - View ${j + 1}`,
                });
            }

            if (uploadedImages.length === 0) {
                throw new Error(
                    'No images were successfully uploaded for this product.',
                );
            }

            // Build variant objects based on sizes
            const variants = item.sizes.map((size) => {
                const attributes = {};
                attributes[attributeName] = size;
                return {
                    attributes: attributes,
                    stock: attributeName === 'waist' ? 10 : 15,
                    price: {
                        amount: item.price,
                        currency: 'INR',
                    },
                    images: uploadedImages,
                };
            });

            // Save main product document
            const product = await productModel.create({
                title: item.title,
                description: item.description.replace(/<\/?[^>]+(>|$)/g, ''), // clean HTML tags from description
                seller: sellerId,
                price: {
                    amount: item.price,
                    currency: 'INR',
                },
                images: uploadedImages,
                variants: variants,
                category: categoryId,
                gender: 'men',
            });

            console.log(
                `   Successfully seeded product with ID: ${product._id}`,
            );
        } catch (error) {
            console.error(
                `   Error seeding product "${item.title}":`,
                error.message,
            );
        }
    }
}

async function seedDatabase() {
    try {
        console.log('Connecting to database...');
        await connectToDb();

        console.log(
            'Clearing existing categories and products from the database...',
        );
        await categoryModel.deleteMany({});
        await productModel.deleteMany({});

        // Clear only target seeded emails to avoid breaking unrelated accounts
        const targetEmails = [
            'dummymail.me.287@gmail.com',
            'skyh53624@gmail.com',
            'leopatel967@gmail.com',
        ];
        console.log('Removing previously seeded sellers if any...');
        await userModel.deleteMany({ email: { $in: targetEmails } });

        console.log('Creating official seller accounts...');
        const sellers = {};

        // Create Streetwear seller
        sellers['dummymail.me.287@gmail.com'] = await userModel.create({
            email: 'dummymail.me.287@gmail.com',
            fullname: 'Snitch Streetwear Co.',
            contact: '9876500001',
            password: 'SellerStreetwear123!',
            role: 'seller',
        });

        // Create Trend/Casuals seller
        sellers['skyh53624@gmail.com'] = await userModel.create({
            email: 'skyh53624@gmail.com',
            fullname: 'Snitch Trend & Casuals',
            contact: '9876500002',
            password: 'SellerTrend123!',
            role: 'seller',
        });

        // Create Denim seller
        sellers['leopatel967@gmail.com'] = await userModel.create({
            email: 'leopatel967@gmail.com',
            fullname: 'Snitch Denim House',
            contact: '9876500003',
            password: '@Aryan287',
            role: 'seller',
        });

        console.log('Sellers created successfully!');

        // Create categories
        const categoriesToSeed = [
            { name: 'Shirts', slug: 'shirts' },
            { name: 'T-shirts', slug: 't-shirts' },
            { name: 'Jeans', slug: 'jeans' },
        ];
        const categoryDocs = {};
        for (const cat of categoriesToSeed) {
            categoryDocs[cat.slug] = await categoryModel.create(cat);
            console.log(`Created category: "${cat.name}"`);
        }

        // Seed Shirts to Snitch Trend & Casuals (skyh53624@gmail.com)
        await seedCategory(
            productsData.shirts,
            sellers['skyh53624@gmail.com']._id,
            categoryDocs['shirts'],
            'size',
        );

        // Seed T-shirts to Snitch Streetwear Co. (dummymail.me.287@gmail.com)
        await seedCategory(
            productsData.tshirts,
            sellers['dummymail.me.287@gmail.com']._id,
            categoryDocs['t-shirts'],
            'size',
        );

        // Seed Jeans to Snitch Denim House (leopatel967@gmail.com)
        await seedCategory(
            productsData.jeans,
            sellers['leopatel967@gmail.com']._id,
            categoryDocs['jeans'],
            'waist',
        );

        console.log('\n==================================================');
        console.log('Database seeding process completed successfully!');
        console.log('==================================================');
        process.exit(0);
    } catch (error) {
        console.error('Seeding process failed:', error);
        process.exit(1);
    }
}

seedDatabase();
