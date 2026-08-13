import { ref } from "vue";
import type { Book } from "../types/book";

const mockBooks: Book[] = [
    {
        id: 1,
        title: "Ways of Seeing",
        author: "John Berger",
        rating: 4.09,
        ratingsCount: 58231,
        published: 1972,
        description:
            "Based on the BBC television series, John Berger's Ways of Seeing changed the way people look at art and images, exploring how we see paintings and the assumptions we bring to them.",
        coverColor: "#1f2937",
    },
    {
        id: 2,
        title: "The Story of Art",
        author: "E.H. Gombrich",
        rating: 3.96,
        ratingsCount: 476928,
        published: 1950,
        description:
            "For more than fifty years The Story of Art has been a global bestseller and a perfect introduction to art history, spanning from the earliest cave paintings to twentieth-century art.",
        coverColor: "#d6d3d1",
    },
    {
        id: 3,
        title: "Art & Fear",
        author: "David Bayles & Ted Orland",
        rating: 4.19,
        ratingsCount: 21044,
        published: 1993,
        description:
            "Observations on the perils (and rewards) of artmaking, exploring the way art gets made, the reasons it often doesn't get made, and the nature of the difficulties that cause so many to give up.",
        coverColor: "#0f172a",
    },
    {
        id: 4,
        title: "Wall and Piece",
        author: "Banksy",
        rating: 4.22,
        ratingsCount: 33417,
        published: 2005,
        description:
            "Banksy has painted, stencilled and screen printed his way across walls around the world, turning the street into the biggest gallery of them all. Wall and Piece collects his best work.",
        coverColor: "#e5e7eb",
    },
    {
        id: 5,
        title: "The Art Book",
        author: "Phaidon Press",
        rating: 4.08,
        ratingsCount: 12987,
        published: 1994,
        description:
            "An A–Z guide to 500 great painters and sculptors from medieval to modern times, breaking with traditional chronological classifications to bring fresh insight into the world of art.",
        coverColor: "#f5f5f4",
    },
    {
        id: 6,
        title: "Girl with a Pearl Earring",
        author: "Tracy Chevalier",
        rating: 3.68,
        ratingsCount: 719264,
        published: 1999,
        description:
            "A luminous historical novel inspired by Vermeer's masterpiece, imagining the life of the young maid whose gaze looks out from one of the world's most famous paintings.",
        coverColor: "#1e3a5f",
    },
    {
        id: 7,
        title: "The Letters of Vincent van Gogh",
        author: "Vincent van Gogh",
        rating: 4.38,
        ratingsCount: 8452,
        published: 1914,
        description:
            "A selection of van Gogh's correspondence that reveals the artist's inner world, his struggles, his relationships, and the passion behind his revolutionary work.",
        coverColor: "#111827",
    },
    {
        id: 8,
        title: "Concerning the Spiritual in Art",
        author: "Wassily Kandinsky",
        rating: 4.05,
        ratingsCount: 9631,
        published: 1911,
        description:
            "A pioneering work on abstraction in which Kandinsky explores the emotional and spiritual power of color and form, laying the theoretical groundwork for modern abstract art.",
        coverColor: "#7f1d1d",
    },
    {
        id: 9,
        title: "Color and Light",
        author: "James Gurney",
        rating: 4.55,
        ratingsCount: 14208,
        published: 2010,
        description:
            "A guide for the realist painter, offering the underlying principles of color and light in a way that far surpasses coverage found in any other title.",
        coverColor: "#78350f",
    },
    {
        id: 10,
        title: "Seven Days in the Art World",
        author: "Sarah Thornton",
        rating: 3.79,
        ratingsCount: 11376,
        published: 2008,
        description:
            "An indelible portrait of a peculiar society: a vivid, behind-the-scenes account of the international art world through seven immersive days.",
        coverColor: "#f3f4f6",
    },
    {
        id: 11,
        title: "The Art Thief",
        author: "Michael Finkel",
        rating: 3.94,
        ratingsCount: 96031,
        published: 2023,
        description:
            "A true story of love, crime, and a dangerous obsession, following the most prolific art thief in history and the trail of masterpieces he stole for the pure love of beauty.",
        coverColor: "#fef3c7",
    },
    {
        id: 12,
        title: "The Creative Act: A Way of Being",
        author: "Rick Rubin",
        rating: 4.23,
        ratingsCount: 88540,
        published: 2023,
        description:
            "A beautiful and generous course of study that masquerades as a book, mapping the creative journey and offering wisdom on how to tune in to the ideas around us.",
        coverColor: "#e7e5e4",
    },
];

export const useBooks = () => {
    const books = ref<Book[]>([]);
    const loading = ref<boolean>(false);
    const error = ref<string | null>(null);

    const fetchBooks = async () => {
        loading.value = true;
        error.value = null;

        try {
            // Simulate a network request against our mock data
            await new Promise((resolve) => setTimeout(resolve, 300));
            books.value = mockBooks;
        } catch (e) {
            error.value = e instanceof Error ? e.message : "Unknown error";
        } finally {
            loading.value = false;
        }
    };

    return { books, loading, error, fetchBooks };
};
