<?php

namespace App\Services;

use League\CommonMark\Environment\Environment;
use League\CommonMark\MarkdownConverter;
use League\CommonMark\Extension\CommonMark\CommonMarkCoreExtension;
use League\CommonMark\Extension\Table\TableExtension;
use League\CommonMark\Extension\Strikethrough\StrikethroughExtension;

class MarkdownService
{

    protected MarkdownConverter $converter;

    /**
     * Create a new class instance.
     */
    public function __construct() {
        $environment = new Environment([
            'html_input' => 'escape',
            'allow_unsafe_links' => false,
            'max_nesting_level' => 5,
            'max_delimiters_per_line' => 20,
        ]);

        $environment->addExtension(new CommonMarkCoreExtension());
        $environment->addExtension(new TableExtension());
        $environment->addExtension(new StrikethroughExtension());

        $this->converter = new MarkdownConverter($environment);
    }

    public function render(string $markdown): string {
        return $this->converter->convert($markdown)->getContent();
    }
}
