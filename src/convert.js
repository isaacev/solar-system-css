function toSolarSystemSCSS (id, diam, bodies) {
  // $id     : 'system';
  // $diam   : 300px;
  // $earth  : ('earth',   0px,  0s, 64px, blue);
  // $moon   : ('moon',  200px, 20s, 24px, gray);
  // $bodies : ($earth, $moon);
  // @include solar-system($id, $diam, $bodies);

  const names = []
  const lists = bodies.map((body) => {
    const name = normalize(body.name)
    names.push('$' + name)
    return `$${name}\t: ('${name}',\t${body.orbit}px,\t${body.speed}s,\t${body.size}px,\t${body.texture});`
  })

  return [
    solarSystemLibrary(),
    lists.join('\n'),
    `$bodies\t: (${names.join(', ')});`,
    `@include solar-system('${id}', ${diam}px, $bodies);`
  ].join('\n')
}

function normalize (abnormal) {
  return abnormal
    .replace(/\s+/, '-')
    .replace(/[^A-Za-z0-9-_]/, '-')
}

function solarSystemLibrary () {
  return [
    '@mixin solar-system ($name, $system-size, $bodies) {',
    '  .solar-system {',
    '    width: $system-size;',
    '    height: $system-size;',
    '    position: relative;',
    '    display: none;',
    '    &##{$name} {',
    '      display: block;',
    '    }',
    '    .orbit {',
    '      float: left;',
    '      position: absolute;',
    '      border-radius: 50%;',
    '      box-shadow: inset 0 0 8px lighten(black, 40%);',
    '      @for $i from 1 through length($bodies) {',
    '        $body   : nth($bodies, $i);',
    '        $name   : nth($body, 1);',
    '        $orbit  : nth($body, 2);',
    '        &##{$name} {',
    '          @include orbit($orbit);',
    '          @if $i == 1 {',
    '            top: ($system-size / 2) - ($orbit / 2);',
    '            left: ($system-size / 2) - ($orbit / 2);',
    '          } @else {',
    '            top: -($orbit / 2);',
    '            left: -($orbit / 2);',
    '          }',
    '        }',
    '      }',
    '      .body {',
    '        width: 100%;',
    '        height: 0;',
    '        position: absolute;',
    '        background-color: rgba(0, 255, 0, 0.2);',
    '        animation-timing-function: linear;',
    '        animation-iteration-count: infinite;',
    '        &::after {',
    '          content: \'\';',
    '          display: block;',
    '          position: absolute;',
    '          border-radius: 50%;',
    '        }',
    '        @for $i from 1 through length($bodies) {',
    '          $body  : nth($bodies, $i);',
    '          $name  : nth($body, 1);',
    '          $orbit : round(nth($body, 2));',
    '          $speed : round(nth($body, 3));',
    '          $diam  : round(nth($body, 4));',
    '          $bg    : nth($body, 5);',
    '          &##{$name} {',
    '            @include planet($orbit, $speed, $diam, $bg);',
    '          }',
    '        }',
    '      }',
    '    }',
    '  }',
    '}',
    '',
    '@mixin planet ($size, $speed, $diam, $bg) {',
    '  top: $size / 2;',
    '  &:after {',
    '    background: $bg;',
    '    background-repeat: no-repeat;',
    '    background-position: center;',
    '    background-size: cover;',
    '    border-radius: 50%;',
    '    width: $diam;',
    '    height: $diam;',
    '    top: (-$diam / 2);',
    '    left: (-$diam / 2);',
    '    animation-name: counter-clockwise;',
    '    animation-timing-function: linear;',
    '    animation-iteration-count: infinite;',
    '  }',
    '  @if $speed == 0 {',
    '    animation: none;',
    '  } @else {',
    '    animation-duration: abs($speed);',
    '    @if $speed < 0 {',
    '      animation-name: clockwise;',
    '    } @else {',
    '      animation-name: counter-clockwise;',
    '    }',
    '  }',
    '}',
    '',
    '@function bg ($start-color, $end-color) {',
    '  @return linear-gradient(135deg, $start-color 0%, $end-color 100%);',
    '}',
    '',
    '@mixin orbit ($size) {',
    '  width: $size;',
    '  height: $size;',
    '}',
    '',
    '@keyframes clockwise {',
    '    0% { transform: rotate(0deg); }',
    '  100% { transform: rotate(360deg); }',
    '}',
    '',
    '@keyframes counter-clockwise {',
    '    0% { transform: rotate(360deg); }',
    '  100% { transform: rotate(0deg); }',
    '}'
  ].join('\n')
}

function toSolarSystemHTML (id, bodies) {
  return `<div id="${id}" class="solar-system">` + indent(bodies.map(toBodyHTML).join('\n')) + '</div>'
}

function toBodyHTML (body) {
  return `<div id="${body.name}" class="orbit"><div id="${body.name}" class="body">` +
    (((body.satellites || []).length > 0) ? indent(body.satellites.map(toBodyHTML).join('\n')) : '') +
    '</div></div>'
}

function indent (string) {
  return '\n' + string.trim().split('\n').map(l => '  ' + l).join('\n') + '\n'
}

export default {
  toSCSS: toSolarSystemSCSS,
  toHTML: toSolarSystemHTML
}
