<?php

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Topic;
use App\Models\Tag;
use App\Models\Category;
use Illuminate\Database\Eloquent\Collection;
use App\Facades\MarkdownService;

class HTopicsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $topicsList = [
            [
                'name' => 'Should Mel Gibson work again?',
                'desc' => "Recently I have been thinking about this a lot considering he has a new film coming out at the end of the year and he is also being looked at for directing a new TV series. He was once a huge box office draw, but back in 06' a video leaked of him while drunk saying a lot of bad things. Most of you probably know this already. I am just wondering if you guys are willing to forgive him for what he said or do you think he should never work in Hollywood again?\n\nI feel ready to forgive him, but thats just me. I know he did bad things, but I feel he would be the first person to own up to them and to say sorry. I also just really miss all the classic roles he brought to the screen, from Riggs to Max. He was such a talented actor and probably still is.",
                'tags' => ['movie', 'Gibson'],
                'category' => 'Movies',
            ],
            [
                'name' => 'Movies You Think Everyone Loves?',
                'desc' => "The Shawshank Redemption \n\nThe Godfather",
                'tags' => ['movie', 'favorite'],
                'category' => 'Movies',
            ],
            [
                'name' => 'Non-Rewatchable Movies',
                'desc' => "These aren't bad movies, in fact on occasion they're masterpieces. These are your Clockwork Oranges or Requiem For A Dream's, Maybe a Schindler's List.\n\nMovies that you admire for the craftsmanship and thought provoking writing or imagery but you wouldn't care to watch again, or don't feel the desire to.\n\nAnyone have a flick or a few like this?",
                'tags' => ['movie', 'non-rewatchable'],
                'category' => 'Movies',
            ],
            [
                'name' => 'Friendship in movies, who had the best bond?',
                'desc' => "I always like in watching movies about buddies, either actiob movies or dramas, i find that giving the characteristic of friendship a real meaning, does a lot to the character development and the overall immersion in how the film develops this friendship, i am very fond of the buddy cop movies in the 80s and 90s, bad boys, lethal weapon series, tango and cash.\n\nBut on the other hand i like to mention one particularly great bond btw 2 actors in cinema history, and what i am talking about here is the friendship that builds between once two enemies on the fighting stage to become the best friendship between two men who care for each other and advise each other.\n\nSo i am gonna mention the best friendship shown on the screen between buddies:\n\n1-rocky balboa and appollo creed, for me this is shown as one of the best friendships in cinema to my beliefs at least.\n\n2-lethal weapon series\n\n3-bad boys\n\n4-tango and cash.\n\nHave your say",
                'tags' => ['movie', 'friendship'],
                'category' => 'Movies',
            ],
            [
                'name' => 'Best Movie In a Horror Series',
                'desc' => "There seem to be quite a few Horror fans here, which is awesome as it's my favorite genre and I always enjoy talking about them. I think this should be a fun little questionaire to do. Of the following Horror series, which entry do you feel is the best in each? Add more series to the list if you'd like, right now I just have some of the notables listed.\n\n---\n\nFriday The 13th\n\nHalloween\n\nA Nightmare On Elm Street\n\nSaw\n\nScream\n\nAlien\n\nPredator\n\nPhantasm\n\nEvil Dead\n\nChild's Play\n\nThe Texas Chainsaw Massacre\n\nHellraiser\n\nFinal Destination\n\nParanormal Activity",
                'tags' => ['movie', 'Horror', 'best'],
                'category' => 'Movies',
            ],
            [
                'name' => 'Most Violent/Gory Movies',
                'desc' => '',
                'tags' => ['movie', 'violent', 'gory'],
                'category' => 'Movies',
            ],
            [
                'name' => 'Movies where one character completely steals the show',
                'desc' => '',
                'tags' => ['movie', 'character'],
                'category' => 'Movies',
            ],
            [
                'name' => 'Timeless classics similar to Pulp Fiction?',
                'desc' => '',
                'tags' => ['movie', 'classics', 'Pulp Fiction'],
                'category' => 'Movies',
            ],
            [
                'name' => 'Fall Movies',
                'desc' => '',
                'tags' => ['movie', 'fall'],
                'category' => 'Movies',
            ],
            [
                'name' => 'Old Movies',
                'desc' => '',
                'tags' => ['movie', 'old'],
                'category' => 'Movies',
            ],
            [
                'name' => 'BBC Top 100 Films of the 21st Century',
                'desc' => '',
                'tags' => ['movie', 'BBC', '21st Century'],
                'category' => 'Movies',
            ],
            [
                'name' => 'Recommendation thread',
                'desc' => '',
                'tags' => ['movie', 'recommendation'],
                'category' => 'Movies',
            ],
            [
                'name' => 'Tugg\'s Top 10 Movies That Need a Remake',
                'desc' => '',
                'tags' => ['movie', 'remake'],
                'category' => 'Movies',
            ],
            [
                'name' => 'Mystery movies',
                'desc' => '',
                'tags' => ['movie', 'mystery'],
                'category' => 'Movies',
            ],
            [
                'name' => 'Perfect Film Scores',
                'desc' => '',
                'tags' => ['movie', 'perfect'],
                'category' => 'Movies',
            ],
            [
                'name' => 'favorite movie soundtracks: whats yours?',
                'desc' => '',
                'tags' => ['movie', 'soundtracks', 'favorite'],
                'category' => 'Movies',
            ],
            [
                'name' => 'Interviews With Directors/Actors',
                'desc' => '',
                'tags' => ['movie', 'interviews'],
                'category' => 'Movies',
            ],
            [
                'name' => 'Your favorite romanian movies',
                'desc' => '',
                'tags' => ['movie', 'romanian'],
                'category' => 'Movies',
            ],
            [
                'name' => 'James Bond, Derek Flint, or Matt Helm?',
                'desc' => '',
                'tags' => ['movie', 'James Bond', 'Derek Flint', 'Matt Helm'],
                'category' => 'Movies',
            ],
            [
                'name' => 'Movies You Watched In School?',
                'desc' => '',
                'tags' => ['movie', 'school'],
                'category' => 'Movies',
            ],
            [
                'name' => 'Your Favorite Characters',
                'desc' => '',
                'tags' => ['movie', 'favorite', 'character'],
                'category' => 'Movies',
            ],
        ];

        $users = User::all();

        $subHours = 5;
        $now = Carbon\Carbon::now();

        foreach ($topicsList as $topicItem) {
            $topic = factory(App\Models\Topic::class)->make();
            $randomUser = $users->random();
            $topic->user()->associate($randomUser);
            $category = Category::where('name', $topicItem['category'])->first();
            $topic->category()->associate($category);
            $topic->name = $topicItem['name'];
            $topic->description = $topicItem['desc'];
            $topic->generated_description = MarkdownService::baseConvert($topicItem['desc']);
            $tagsIds = [];
            foreach ($topicItem['tags'] as $topicTag) {
                if ($tag = Tag::where('name', $topicTag)->first()) {
                    $tagsIds[] = $tag;
                } else {
                    $tag = Tag::create(['name' => $topicTag]);
                    $tagsIds[] = $tag;
                }
            }
            $slug = str_slug($topicItem['name'], '-');
            $topic->slug = $slug;
            $topic->created_at = $now->subHour($subHours);
            $topic->updated_at = $topic->created_at;
            $subHours = rand(2, 24);
            $topic->save();
            $topic->tags()->saveMany($tagsIds);
        }
    }
}
